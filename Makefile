run: 
	npm start

docker-build:
	docker buildx build --platform=linux/amd64 -t labconnect-frontend .
	docker tag labconnect-backend enchanter77/labconnect-frontend
	docker push enchanter77/labconnect-frontend