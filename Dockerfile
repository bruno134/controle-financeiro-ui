FROM arm64v8/nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY /dist/controle-financeiro-ui /usr/share/nginx/html