develop: 
	npm run dev

build:
	npm run build

run:
	serve -s build

docker-build: build
	docker build -t labconnect-frontend .
	docker tag labconnect-frontend enchanter77/labconnect-frontend
	docker push enchanter77/labconnect-frontend

lint:
	npm run lint

lintfix:
	eslint --max-warnings=0 'src/**/*{js,jsx,ts,tsx}' --fix