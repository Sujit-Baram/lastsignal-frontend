# The Last Signal — frontend

A small branching-story (choose-your-own-adventure) React app, containerized
with a multi-stage Docker build, ready to push to Docker Hub and run on EKS.

## Stack

- React 18 + Vite (build tool)
- Plain CSS (no framework)
- nginx:1.27-alpine to serve the built static files
- Kubernetes manifests in `k8s/` for EKS

## 1. Run it locally (no Docker)

```bash
npm install
npm run dev
```

Opens on http://localhost:5173

## 2. Build and run the Docker image locally

```bash
docker build -t lastsignal-frontend:local .
docker run --rm -p 8080:80 lastsignal-frontend:local
```

Opens on http://localhost:8080

## 3. Push to Docker Hub

```bash
docker login

# Tag with your Docker Hub namespace
docker tag lastsignal-frontend:local <dockerhub-username>/lastsignal-frontend:latest
docker tag lastsignal-frontend:local <dockerhub-username>/lastsignal-frontend:v1

docker push <dockerhub-username>/lastsignal-frontend:latest
docker push <dockerhub-username>/lastsignal-frontend:v1
```

For multi-arch (recommended if you build on Apple Silicon but EKS nodes are
x86_64):

```bash
docker buildx create --use --name multiarch 2>/dev/null || docker buildx use multiarch
docker buildx build --platform linux/amd64,linux/arm64 \
  -t <dockerhub-username>/lastsignal-frontend:latest --push .
```

## 4. Deploy to EKS

Edit `k8s/deployment.yaml` and replace `<dockerhub-username>` with your
Docker Hub namespace, then apply both manifests:

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

kubectl get pods -l app=lastsignal-frontend
kubectl get svc lastsignal-frontend
```

If your Docker Hub repo is private, create an image pull secret first and
reference it under `spec.template.spec.imagePullSecrets` in the Deployment:

```bash
kubectl create secret docker-registry dockerhub-creds \
  --docker-server=https://index.docker.io/v1/ \
  --docker-username=<dockerhub-username> \
  --docker-password=<dockerhub-token> \
  --docker-email=<your-email>
```

### Exposing it

`k8s/service.yaml` defaults to `ClusterIP`. To reach it from outside the
cluster, either:

- Change `type: ClusterIP` to `type: LoadBalancer` (provisions an ELB), or
- Put an `Ingress` (ALB Ingress Controller / AWS Load Balancer Controller) in
  front of the ClusterIP service — the usual pattern if you're already
  running an ingress controller on the cluster.

## Project layout

```
.
├── Dockerfile           # multi-stage: node build -> nginx serve
├── nginx.conf            # SPA fallback + gzip + asset caching
├── src/
│   ├── App.jsx            # story engine (state machine over story.js)
│   ├── story.js            # the branching narrative content
│   ├── index.css           # theme
│   └── main.jsx
├── k8s/
│   ├── deployment.yaml
│   └── service.yaml
└── index.html
```

## Editing the story

All narrative content lives in `src/story.js` as a graph of nodes: each node
has a `chapter` label, `body` paragraphs, and either `choices` (pointing at
the next node's key) or `ending: true` with `endingTitle` / `endingBody`. Add
a new node and point a choice at its key to branch the story further.
