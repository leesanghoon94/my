k apply -f sa
helm repo add eks https://aws.github.io/eks-charts
helm repo update eks

helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
 -n kube-system \
 --set clusterName=my-cluster \
 --set serviceAccount.create=false \
 --set serviceAccount.name=aws-load-balancer-controller
