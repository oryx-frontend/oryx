# Packages

## Layers

While packages are all distributed as a flat list, there is an architectural hierarchy. The hierarchy is important as it will protect from cyclic dependencies.

Packages inside a layer can depend on sibling packages inside the layer without any issues. Packages can never depend on a layer above.

```mermaid
%%{init: {'theme':'base', 'themeVariables': { 'primaryColor': '#fff','primaryBorderColor': '#aaa'}}}%%

flowchart TD
classDef app fill:#fff,stroke:#fff;

app("Application"):::app
template(Template packages):::template
domain(Domain packages)
platform(Platform packages)
base(Base packages)

app-..->|"use presets\n(e.g. b2c)"|template
app-->domain

template --> domain
domain --> platform
platform --> base
domain --> base
```

### Template packages

This template layer contains packages that can be used as quick starters for demos and projects. Templated packages do follow semantic versioning and will deliver on the promise of upgradability, but are fairly opinionated as they mainly serve to get up to speed fast with a standard frontend application.

### Domain packages

Domain packages provide components, services and adapters for a certain domain. Organising packages in domains helps the developer experience, as its' fairly easy to understand where to find a certain component or service. An example of a domain package is the `product` package, which contains all product related components as well as the product services and adapters that integrates with Spryker APIs.

### Platform packages

The platform layer contains the core packages, including `core` itself. They are providing the infrastructure to the whole system.

### Base packages

The base layer contains packages that serve as utilities to all above layers. An important part of the base layer is the design system package (UI).

## Packages

| Layer        | Packages    | Location                     |
| ------------ | ----------- | ---------------------------- |
| **Template** |             |                              |
|              | Presets     | `@oryx-frontend/presets`     |
|              | Application | `@oryx-frontend/application` |
|              | Themes      | `@oryx-frontend/themes`      |
| **Domain**   |             |                              |
|              | Site        | `@oryx-frontend/site`        |
|              | Auth        | `@oryx-frontend/auth`        |
|              | User        | `@oryx-frontend/user`        |
|              | Product     | `@oryx-frontend/product`     |
|              | Search      | `@oryx-frontend/search`      |
|              | Cart        | `@oryx-frontend/cart`        |
|              | Checkout    | `@oryx-frontend/checkout`    |
|              | Content     | `@oryx-frontend/content`     |
| **Platform** |             |                              |
|              | Core        | `@oryx-frontend/core`        |
|              | I18n        | `@oryx-frontend/i18n`        |
|              | Experience  | `@oryx-frontend/experience`  |
| **Base**     |             |                              |
|              | UI          | `@oryx-frontend/ui`          |
|              | Form        | `@oryx-frontend/form`        |
|              | Utilities   | `@oryx-frontend/utilities`   |
|              | DI          | `@oryx-frontend/di`          |

## Module boundaries

NX has a lint rule that allows to enforce module boundaries by configuring tags and assigning them the each package.
We configured our modules to have tags according to the layer. So for now there are following tags:

- `type:app` - all the application inside `apps` folder
- `layer:*` - packages inside `libs/*` folder (ex. `layer:base` or `layer:domain`)
- `lib:*` - separate package, marked individually as exception to add some specific rule. For now it's used to aviod our own violations.

To mark properly new library just add an appropriate layer tag to the `project.json`:

```
"tags": ["layer:base"]
```

## Versioning

Package are published with semantic versioning. The versioning will come with the promise of avoiding breaking changes outside the major version upgrades.

All packages are distributed with the same version, to avoid complex dependency management.

## Distribution

Packages are distributed under the `@oryx-frontend` scope.
