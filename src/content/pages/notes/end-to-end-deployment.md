---
title: "End-to-End Deployment"
description: "Deploying a Python application with Docker, DigitalOcean, and GitHub Actions CI/CD"
---

# End-to-End Deployment

A complete deployment pipeline for PyRunner, a Python code execution service, demonstrating containerization, cloud infrastructure, and continuous deployment.

## Project Overview

PyRunner is a REST API that executes Python code in isolated Docker containers. The deployment architecture includes:

- **Containerization**: Docker for consistent environments
- **Cloud Infrastructure**: DigitalOcean Droplet hosting
- **CI/CD**: GitHub Actions for automated deployment
- **Security**: Firewall configuration and container isolation

## Architecture

### Application Stack

```
Client Request
    ↓
API Gateway (Flask)
    ↓
Docker Container (Python Execution)
    ↓
Response
```

### Deployment Pipeline

```
GitHub Push
    ↓
GitHub Actions (Build & Test)
    ↓
Docker Image Build
    ↓
Deploy to DigitalOcean
    ↓
Container Restart
```

## Implementation Details

### 1. Dockerization

**Multi-stage Dockerfile** for optimized image size:

```dockerfile
# Build stage
FROM python:3.9-slim as builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user -r requirements.txt

# Runtime stage
FROM python:3.9-slim
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
CMD ["python", "app.py"]
```

**Docker Compose** for local development:

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "5000:5000"
    volumes:
      - ./:/app
    environment:
      - FLASK_ENV=development
```

### 2. DigitalOcean Setup

**Droplet Configuration**:
- Ubuntu 20.04 LTS
- 2GB RAM / 1 CPU
- Docker pre-installed
- SSH key authentication

**Firewall Rules**:
```bash
# Allow SSH
ufw allow 22/tcp

# Allow HTTP/HTTPS
ufw allow 80/tcp
ufw allow 443/tcp

# Enable firewall
ufw enable
```

**Docker Installation**:
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Add user to docker group
usermod -aG docker $USER
```

### 3. GitHub Actions CI/CD

**.github/workflows/deploy.yml**:

```yaml
name: Deploy to DigitalOcean

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v1

    - name: Login to Docker Hub
      uses: docker/login-action@v1
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}

    - name: Build and push
      uses: docker/build-push-action@v2
      with:
        push: true
        tags: user/pyrunner:latest

    - name: Deploy to DigitalOcean
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.DO_HOST }}
        username: ${{ secrets.DO_USERNAME }}
        key: ${{ secrets.DO_SSH_KEY }}
        script: |
          docker pull user/pyrunner:latest
          docker stop pyrunner || true
          docker rm pyrunner || true
          docker run -d --name pyrunner -p 80:5000 user/pyrunner:latest
```

### 4. Application Code

**Flask API** (app.py):

```python
from flask import Flask, request, jsonify
import docker
import uuid

app = Flask(__name__)
client = docker.from_env()

@app.route('/execute', methods=['POST'])
def execute_code():
    code = request.json.get('code')

    # Generate unique container name
    container_name = f"pyrunner-{uuid.uuid4()}"

    try:
        # Create and run container
        container = client.containers.run(
            "python:3.9-slim",
            f"python -c '{code}'",
            name=container_name,
            detach=True,
            remove=True,
            mem_limit="256m",
            cpu_quota=50000
        )

        # Wait for completion (timeout after 10s)
        result = container.wait(timeout=10)
        logs = container.logs().decode('utf-8')

        return jsonify({
            'status': 'success',
            'output': logs
        })

    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

### 5. Security Considerations

**Container Isolation**:
- Memory limits (256MB per execution)
- CPU quotas (50% of one core)
- Network isolation (no internet access)
- Automatic cleanup (remove after execution)

**API Security**:
```python
# Rate limiting
from flask_limiter import Limiter

limiter = Limiter(
    app,
    key_func=lambda: request.remote_addr,
    default_limits=["100 per hour"]
)

# Input validation
def validate_code(code):
    # Blacklist dangerous imports
    forbidden = ['os', 'subprocess', 'socket']
    for module in forbidden:
        if f'import {module}' in code:
            raise ValueError(f'Import of {module} is not allowed')
```

## Deployment Workflow

### Initial Setup

1. **Create DigitalOcean Droplet**:
```bash
# Using doctl CLI
doctl compute droplet create pyrunner \
  --image ubuntu-20-04-x64 \
  --size s-1vcpu-2gb \
  --region nyc1 \
  --ssh-keys <your-ssh-key-id>
```

2. **Configure Server**:
```bash
# SSH into droplet
ssh root@your-droplet-ip

# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Configure firewall
ufw allow 22
ufw allow 80
ufw allow 443
ufw enable
```

3. **Set GitHub Secrets**:
- `DOCKER_USERNAME`: Docker Hub username
- `DOCKER_PASSWORD`: Docker Hub password
- `DO_HOST`: Droplet IP address
- `DO_USERNAME`: SSH username (root or created user)
- `DO_SSH_KEY`: Private SSH key

### Continuous Deployment

1. **Make code changes** in local repository
2. **Commit and push** to main branch
3. **GitHub Actions triggers**:
   - Runs tests
   - Builds Docker image
   - Pushes to Docker Hub
   - SSHs into droplet
   - Pulls new image
   - Restarts container
4. **New version live** at droplet IP

## Monitoring and Maintenance

### Health Checks

```python
@app.route('/health')
def health():
    return jsonify({'status': 'healthy'})
```

### Log Monitoring

```bash
# View container logs
docker logs -f pyrunner

# View system logs
journalctl -u docker -f
```

### Resource Monitoring

```bash
# Check container stats
docker stats pyrunner

# Check system resources
htop
```

## Key Learnings

### Docker Best Practices

- **Multi-stage builds** reduce image size significantly
- **Resource limits** prevent container abuse
- **Health checks** enable automatic restarts
- **Volume mounts** separate code from data

### CI/CD Insights

- **Secrets management** is critical for security
- **Automated testing** catches bugs before deployment
- **Rollback strategy** essential for production
- **Deploy frequency** impacts iteration speed

### Cloud Infrastructure

- **Firewall configuration** is first line of defense
- **SSH keys** more secure than passwords
- **Monitoring** enables proactive maintenance
- **Backups** prevent data loss

## Challenges and Solutions

### Challenge: Container Cleanup

**Problem**: Abandoned containers consuming resources

**Solution**: Auto-remove flag and periodic cleanup script:
```bash
# Cleanup script
docker container prune -f
docker image prune -f
```

### Challenge: Deployment Downtime

**Problem**: Service unavailable during deployment

**Solution**: Blue-green deployment:
```bash
# Start new container on different port
docker run -d --name pyrunner-new -p 8080:5000 image:latest

# Health check new container
curl http://localhost:8080/health

# Switch traffic (update nginx/load balancer)
# Then stop old container
docker stop pyrunner-old
```

### Challenge: Security Vulnerabilities

**Problem**: Arbitrary code execution risks

**Solution**: Multiple layers of protection:
- Container isolation
- Resource limits
- Code validation
- Rate limiting
- Network restrictions

## Production Enhancements

### SSL/TLS with Let's Encrypt

```bash
# Install Certbot
apt install certbot python3-certbot-nginx

# Obtain certificate
certbot --nginx -d your-domain.com

# Auto-renewal
certbot renew --dry-run
```

### Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Database Integration

```python
# Add PostgreSQL for persistent storage
from flask_sqlalchemy import SQLAlchemy

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
db = SQLAlchemy(app)

class Execution(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.Text)
    output = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
```

## Conclusion

This end-to-end deployment demonstrates the complete lifecycle of a modern web application:

- **Containerization** ensures consistency across environments
- **CI/CD** automates testing and deployment
- **Cloud infrastructure** provides scalable hosting
- **Security measures** protect against abuse

The pipeline enables rapid iteration while maintaining reliability and security. Future enhancements could include multi-region deployment, auto-scaling, and advanced monitoring.

## Resources

- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions Guide](https://docs.github.com/en/actions)
- [DigitalOcean Tutorials](https://www.digitalocean.com/community/tutorials)
- [Flask Deployment Options](https://flask.palletsprojects.com/en/2.0.x/deploying/)
