# koa-next-monorepo

## Getting Started

**Prerequisites**

- `Yarnpkg` v3.1.1 or higher
- `Node.js` v18.16.1 or higher
- `Docker` 20.10.23 or higher

### Installing

#### 1. Clone Repository

```bash
git clone git@github.com:celestialstag/koa-next-monorepo.git
```

#### 2. Install Dependencies

```bash
yarn install
```

#### 3. Create Configuration Files

**dotenv**

```bash
cp .env.example .env
```

### Building

#### 1. Bundle libraries

```bash
yarn rollup:libs
```

#### 2. Build API

```bash
yarn build:api
```

### Running

**API** - _Run API production build_

```bash
yarn start:api
```

### Development

**Libraries** - _Watch and auto-build libraries_

```bash
yarn watch:libs
```

**API** - _Watch API development build_

```bash
yarn watch:api
```
