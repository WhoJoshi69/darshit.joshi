import { IBlog } from '@/types';

export const blog: IBlog = {
    title: 'Docker and Kubernetes: A Developer\'s Guide to Container Orchestration',
    slug: 'docker-kubernetes-guide',
    year: 2023,
    description: 'Master containerization and orchestration with Docker and Kubernetes for modern application deployment.',
    readTime: '10 min read',
    tags: ['Docker', 'Kubernetes', 'DevOps', 'Containers', 'Deployment'],
    thumbnail: '/projects/long/dosepack.png',
    publishedAt: '2023-08-10',
    excerpt: 'A practical guide to containerizing applications with Docker and deploying them at scale using Kubernetes orchestration.',
    content: `# Docker and Kubernetes: A Developer's Guide to Container Orchestration

Container orchestration has revolutionized how we deploy and manage applications at scale. This guide provides a comprehensive overview of Docker and Kubernetes, from basic concepts to production deployment strategies.

## Understanding Containers

Containers package applications with their dependencies, ensuring consistent behavior across different environments. Docker has become the de facto standard for containerization.

### Benefits of Containerization:
- **Consistency**: Same behavior across environments
- **Isolation**: Applications don't interfere with each other
- **Portability**: Run anywhere Docker is supported
- **Efficiency**: Lightweight compared to virtual machines

## Docker Fundamentals

### Creating a Dockerfile

\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

USER node

CMD ["npm", "start"]
\`\`\`

### Docker Compose for Multi-Service Applications

\`\`\`yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/myapp
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
\`\`\`

## Kubernetes Orchestration

Kubernetes provides powerful orchestration capabilities for containerized applications, handling deployment, scaling, and management automatically.

### Core Kubernetes Concepts:
- **Pods**: Smallest deployable units
- **Services**: Network access to pods
- **Deployments**: Manage pod replicas
- **ConfigMaps**: Configuration management
- **Secrets**: Sensitive data management

### Deployment Configuration

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: web-app
        image: myapp:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
\`\`\`

### Service Configuration

\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: web-app-service
spec:
  selector:
    app: web-app
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: LoadBalancer
\`\`\`

## Best Practices

### Docker Best Practices:
1. **Use multi-stage builds** to reduce image size
2. **Run as non-root user** for security
3. **Use specific image tags** instead of 'latest'
4. **Minimize layers** in Dockerfile
5. **Use .dockerignore** to exclude unnecessary files

### Multi-stage Build Example

\`\`\`dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
USER node
CMD ["npm", "start"]
\`\`\`

### Kubernetes Best Practices:
1. **Set resource limits** and requests
2. **Use health checks** (liveness and readiness probes)
3. **Implement proper logging** and monitoring
4. **Use namespaces** for organization
5. **Secure with RBAC** and network policies

### Health Check Configuration

\`\`\`yaml
spec:
  containers:
  - name: web-app
    image: myapp:latest
    livenessProbe:
      httpGet:
        path: /health
        port: 3000
      initialDelaySeconds: 30
      periodSeconds: 10
    readinessProbe:
      httpGet:
        path: /ready
        port: 3000
      initialDelaySeconds: 5
      periodSeconds: 5
\`\`\`

## Production Deployment Strategy

### Rolling Updates
Kubernetes supports zero-downtime deployments through rolling updates:

\`\`\`yaml
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
\`\`\`

### Horizontal Pod Autoscaler

\`\`\`yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-app
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
\`\`\`

## Monitoring and Observability

### Prometheus and Grafana Setup

\`\`\`yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
    scrape_configs:
    - job_name: 'kubernetes-pods'
      kubernetes_sd_configs:
      - role: pod
\`\`\`

### Logging with ELK Stack
- **Elasticsearch**: Store and index logs
- **Logstash**: Process and transform logs
- **Kibana**: Visualize and search logs

## Security Considerations

### Network Policies

\`\`\`yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: web-app-netpol
spec:
  podSelector:
    matchLabels:
      app: web-app
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    ports:
    - protocol: TCP
      port: 3000
\`\`\`

### RBAC Configuration

\`\`\`yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "watch", "list"]
\`\`\`

## Troubleshooting Common Issues

### Debug Pod Issues
\`\`\`bash
# Check pod status
kubectl get pods

# View pod logs
kubectl logs <pod-name>

# Describe pod for events
kubectl describe pod <pod-name>

# Execute commands in pod
kubectl exec -it <pod-name> -- /bin/sh
\`\`\`

### Resource Management
- Monitor resource usage with `kubectl top`
- Set appropriate resource requests and limits
- Use resource quotas to prevent resource exhaustion

## Conclusion

Docker and Kubernetes provide a powerful foundation for modern application deployment. Start with Docker for containerization, then leverage Kubernetes for orchestration as your applications scale. Focus on best practices from the beginning to ensure secure, efficient, and maintainable deployments.

The key to success is understanding the fundamentals, implementing proper monitoring, and gradually adopting advanced features as your team's expertise grows.`
};