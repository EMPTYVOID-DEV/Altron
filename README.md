# Altron

![Altron Logo](./static/altronBg.png)

## Introduction

**Altron** is a robust and versatile rich text editor designed for Svelte applications. It empowers users to effortlessly create, edit, and manage structured text content by seamlessly incorporating various blocks with associated data. This component is meticulously crafted to offer high customizability, responsiveness on mobile devices, and support for both editing and viewing modes.

## Documentation site

You can check our [altron-site](https://altron.vercel.app). We have clear documentation with an example and a live testing route.

## Getting started

To use altron we need to follow the following steps.

1-Installing altron core package

```bash
pnpm i @altron/altron
```

2-Loading blocks dependencies with the cli

```bash
pnpm dlx @altron/altron-cli
```

3-Importing the entry and componentMap

The cli will create a map that links the component name with it svelte class.You need to import and pass it to altron entry as a prop.

```Svelte

<script>
   import Altron from "@altron/altron/altron.svelte"
   import { componentMap } from '$lib/components/altron/index';
</script>

<Altron {componentMap} />
```

## Contribution

We welcome contributions! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit/).Feel free to use or modify as needed!
