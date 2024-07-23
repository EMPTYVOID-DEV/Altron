# Types

**Altron** uses well-defined types across all of its sub-components. Here they are:

####  IframeSettings

These are set of settings that will be passed to iframe inside embed block view.

```Typescript
type IframeSettings = {
    allow?: string;
    sandbox?: string;
    referrerpolicy?: 'no-referrer' | 'no-referrer-when-downgrade' | 'origin'
    | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' 
    |'strict-  origin-when-cross-origin' | 'unsafe-url';
    credentialless?: boolean;
    loading?: 'eager' | 'lazy';
};  
```

#### blocks

Union type for the blocks names 

```Typescript
type blocks = 'image' | 'code' | 'quote' | 'paragraph' | 'header' | 'list' 
| 'space'| 'checklist' | 'attachment' | 'embed';
```

#### dataBlock

Already explained different blocks data

```Typescript
type dataBlock =
| { name: 'image'; id: string; data: { file:File ; caption: string , src:string}}
| { name: 'paragraph'; id: string; data: { text: string } }
| { name: 'code'; id: string; data: { text: string; lang: string } }
| { name: 'quote'; id: string; data: { text: string; owner: string } }
| { name: 'header'; id: string; data: { text: string; level: 1 | 2 | 3 | 4 } }
| { name: 'space'; id: string; data: { size: number } }
| { name: 'list'; id: string; data: { items: string[]; type: 'ordered' |    
		 'unordered' } }
| { name: 'checklist'; id: string; data: { items: { value: string; checked: 
		  boolean }[] } }
| { name: 'attachment'; id: string; data: { file: File; title: string ,  
          size:number,src:string,type:string } }
| { name: 'embed'; id: string; data: { src: string } };
```

