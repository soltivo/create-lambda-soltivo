# Setup

Make sure to have those installed on your computer
- **AWS CLI:** https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html
- **AWS SAM CLI:** https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html
- **Docker:** https://www.docker.com/products/docker-desktop
- **Git:** https://git-scm.com/downloads
- **Node.js 12.19.1:** https://nodejs.org/en/download/releases/

## Setup Steps

1. Download this snippet & put it at the root https://bitbucket.org/soltivo/workspace/snippets/bLaAbE

2. Go to template.yml and copy the snippet provided

1. Go to `src\tests\utils\databaseDefinition.ts` and copy the snippet provided

2. Go to `src\utils\filter.ts` and copy the snippet provided

3. Go to  `src\utils\database.ts` there, you can add some obejcts for secondary indexes and data prefixes

4. Create your first handler in `src\handlers` as follow --> {actionName}{ServiceName}.ts --> createService.ts

5. Add you body validation and other validations in `src\utils\validation.ts`

6. Write your test cases in `src\tests\1-your.tests.ts` you can rename the file and create 1 file per Method


# Available commands

Compile your code & watch it:
```bash
npm run build
```

Run your DynamoDB locally
```bash
npm run start:db
```

Run your lambda locally:
```bash
npm start
```

Test your code:
```bash
npm test
```


> **Important** make sure to update the template.yml before running your code locally or trying to deploy to the test environment.
> You don't need to deploy your code, the pipeline does it for you


