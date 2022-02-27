# Jackson Demo App

Demo web app that shows how to use [SAML Jackson](https://github.com/boxyhq/jackson). You need to run Jackson as a [service](https://boxyhq.com/docs/jackson/deploy/service).

## Setup Instructions

Follow the below instructions to setup this demo.

### Clone the repo

```bash
git clone https://github.com/boxyhq/jackson-demo.git
```

```bash
cd jackson-demo
```

### Install dependencies

```bash
npm install
```

### Setup environment variables

Update the `NEXT_PUBLIC_JACKSON_SERVICE` variable in `.env` to point to the Jackson service.

### Start the server

```bash
npm run dev
```

### Testing

The demo app can be accessed locally using the following URL.

```bash
http://localhost:3366
```
