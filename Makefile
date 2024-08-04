develop: 
	npm start

build:
	npm run build

run:
	serve -s build

docker-build: build
	docker build -t labconnect-frontend .
	docker tag labconnect-frontend enchanter77/labconnect-frontend
	docker push enchanter77/labconnect-frontend

lint:
	eslint --max-warnings=0 'src/**/*{js,jsx,ts,tsx}'

lintfix:
	eslint --max-warnings=0 'src/**/*{js,jsx,ts,tsx}' --fix