/**
 * DevRoadmap - Comprehensive Curated Roadmap Data
 * Provides detailed learning paths for all Web and Mobile technologies
 * across Beginner, Intermediate, and Advanced levels.
 */

export const ROADMAP_DATA = {
  // ==========================================
  // FRONTEND WEB: JAVASCRIPT
  // ==========================================
  javascript: {
    id: 'javascript',
    name: 'JavaScript',
    category: 'frontend_web',
    tagline: 'The programming language of the Web',
    levels: {
      beginner: [
        {
          id: 'js_basics',
          title: 'JavaScript Fundamentals',
          description: 'Variables, data types, operators, and basic control flow.',
          topics: [
            {
              id: 'js_vars_types',
              title: 'Variables & Data Types',
              description: 'Learn var, let, const, primitive types (string, number, boolean, null, undefined, symbol, bigint) and objects.',
              details: 'Variables in JavaScript store data values. Modern JS uses `let` for reassignable variables and `const` for immutable bindings. Understand type coercion and the typeof operator.',
              subtopics: ['var vs let vs const', 'Primitive vs Reference types', 'Type conversion & Coercion', 'Template literals'],
              resources: [
                { title: 'MDN: JavaScript data types and data structures', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures', type: 'doc' },
                { title: 'javascript.info: Variables', url: 'https://javascript.info/variables', type: 'article' },
              ],
            },
            {
              id: 'js_control_flow',
              title: 'Control Flow & Conditionals',
              description: 'if/else statements, switch-case, ternary operators, and logical operators.',
              details: 'Control flow determines the execution order of statements based on conditions. Master truthy/falsy values, short-circuit evaluation, and optional chaining.',
              subtopics: ['if, else if, else', 'switch statements', 'Ternary operator', 'Truthy vs Falsy values', 'Nullish coalescing (??)'],
              resources: [
                { title: 'MDN: Making decisions in your code', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/conditionals', type: 'doc' },
              ],
            },
            {
              id: 'js_functions_intro',
              title: 'Functions & Scope',
              description: 'Function declarations, expressions, arrow functions, and scope basics.',
              details: 'Functions are first-class citizens in JavaScript. Understand parameters, default parameters, return values, block scope, and function scope.',
              subtopics: ['Function declarations vs expressions', 'Arrow functions', 'Default & Rest parameters', 'Global and Block Scope'],
              resources: [
                { title: 'MDN: Functions Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions', type: 'doc' },
              ],
            },
            {
              id: 'js_arrays_objects',
              title: 'Arrays & Object Basics',
              description: 'Array manipulation, common methods, object properties, and iteration.',
              details: 'Master arrays and objects which represent the primary data structures in JS. Practice with map, filter, reduce, push, pop, and object destructuring.',
              subtopics: ['Array indexing and length', 'Array methods (map, filter, forEach, slice, splice)', 'Object literals & property access', 'Object and Array destructuring'],
              resources: [
                { title: 'javascript.info: Array methods', url: 'https://javascript.info/array-methods', type: 'article' },
              ],
            },
          ],
        },
        {
          id: 'js_dom_manipulation',
          title: 'DOM Manipulation & Events',
          description: 'Interacting with HTML elements, event listeners, and DOM traversal.',
          topics: [
            {
              id: 'js_dom_selectors',
              title: 'Selecting and Modifying Elements',
              description: 'querySelector, getElementById, innerHTML, textContent, and classList.',
              details: 'The Document Object Model represents the web page. Learn how to select nodes, create new elements dynamically, and update CSS styles or classes.',
              subtopics: ['querySelector and querySelectorAll', 'Creating and removing DOM nodes', 'classList (add, remove, toggle)', 'Attributes and datasets'],
              resources: [
                { title: 'MDN: Introduction to the DOM', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction', type: 'doc' },
              ],
            },
            {
              id: 'js_dom_events',
              title: 'Event Listeners & Event Bubbling',
              description: 'Handling user clicks, inputs, keyboard events, bubbling, and delegation.',
              details: 'Events allow you to execute code when user actions occur. Understand event propagation (capturing and bubbling) and how event delegation optimizes performance.',
              subtopics: ['addEventListener & removeEventListener', 'Event object (e.target, e.preventDefault)', 'Event Bubbling & Capturing', 'Event Delegation pattern'],
              resources: [
                { title: 'javascript.info: Introduction to Browser Events', url: 'https://javascript.info/events-introduction', type: 'article' },
              ],
            },
          ],
        },
      ],
      intermediate: [
        {
          id: 'js_async',
          title: 'Asynchronous JavaScript',
          description: 'Event loop, callbacks, Promises, and async/await syntax.',
          topics: [
            {
              id: 'js_promises',
              title: 'Promises & Fetch API',
              description: 'Promise lifecycle (pending, fulfilled, rejected), chaining, and error handling.',
              details: 'Promises represent values available now, later, or never. Master Promise.all, Promise.race, Promise.allSettled, and the browser Fetch API for HTTP requests.',
              subtopics: ['Creating and resolving Promises', 'Promise chaining with .then() and .catch()', 'Promise.all & Promise.race', 'Fetch API for REST requests'],
              resources: [
                { title: 'MDN: Using Promises', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises', type: 'doc' },
              ],
            },
            {
              id: 'js_async_await',
              title: 'Async / Await Syntax',
              description: 'Writing synchronous-looking asynchronous code with try/catch blocks.',
              details: 'Async/await is syntactic sugar over Promises, making asynchronous code cleaner and easier to read, reason about, and debug with standard try/catch statements.',
              subtopics: ['async function declaration', 'await expression', 'Error handling with try/catch', 'Parallel vs sequential execution with await'],
              resources: [
                { title: 'javascript.info: Async/await', url: 'https://javascript.info/async-await', type: 'article' },
              ],
            },
            {
              id: 'js_event_loop',
              title: 'The Event Loop & Concurrency',
              description: 'Call stack, Web APIs, Task Queue, Microtask Queue, and execution order.',
              details: 'Understand how JavaScript executes asynchronous operations in a single-threaded runtime using the Event Loop, macro-tasks (setTimeout) and micro-tasks (Promises).',
              subtopics: ['Call Stack', 'Macrotasks vs Microtasks', 'setTimeout & setInterval', 'requestAnimationFrame'],
              resources: [
                { title: 'Jake Archibald: In The Loop (YouTube)', url: 'https://www.youtube.com/watch?v=cCOL7MC4Pl0', type: 'video' },
              ],
            },
          ],
        },
        {
          id: 'js_core_concepts',
          title: 'Advanced Core Concepts',
          description: 'Closures, prototype chain, "this" keyword, and ES6+ modules.',
          topics: [
            {
              id: 'js_closures',
              title: 'Closures & Lexical Scope',
              description: 'How functions retain access to their outer lexical environment.',
              details: 'A closure is the combination of a function bundled together with references to its lexical environment. Essential for data privacy, factories, and currying.',
              subtopics: ['Lexical scoping', 'Creating private variables', 'Module pattern', 'Memory retention and leaks'],
              resources: [
                { title: 'MDN: Closures', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures', type: 'doc' },
              ],
            },
            {
              id: 'js_this_context',
              title: 'The "this" Keyword & Prototypes',
              description: 'Implicit vs explicit binding (call, apply, bind) and prototype inheritance.',
              details: 'Learn how `this` is bound at invocation time. Compare regular functions with arrow functions (lexical this), and understand JavaScript prototype chains and classes.',
              subtopics: ['Implicit binding & default binding', 'Explicit binding (call, apply, bind)', 'Arrow function this behavior', 'Object.prototype and inheritance'],
              resources: [
                { title: 'javascript.info: Object methods, "this"', url: 'https://javascript.info/object-methods', type: 'article' },
              ],
            },
          ],
        },
      ],
      advanced: [
        {
          id: 'js_perf_internals',
          title: 'Performance & Engine Internals',
          description: 'V8 engine optimization, memory management, and web workers.',
          topics: [
            {
              id: 'js_v8_memory',
              title: 'V8 Engine & Memory Management',
              description: 'Garbage collection (Mark-and-Sweep), memory leaks, and JIT compilation.',
              details: 'Learn how modern JS engines (V8, SpiderMonkey) optimize code through inline caches and hidden classes. Detect and fix memory leaks using browser DevTools.',
              subtopics: ['Garbage Collection algorithms', 'Memory leak identification (detached DOM, timers)', 'Hidden classes and shapes', 'Profiling with Chrome DevTools Memory tab'],
              resources: [
                { title: 'V8 Blog: Memory management', url: 'https://v8.dev/blog', type: 'article' },
              ],
            },
            {
              id: 'js_multithreading',
              title: 'Web Workers & SharedArrayBuffer',
              description: 'True multithreading in JavaScript using Web Workers and Service Workers.',
              details: 'Offload CPU-intensive calculations from the main thread using Web Workers, postMessage communication, and SharedArrayBuffer with Atomics.',
              subtopics: ['Dedicated Web Workers', 'Service Workers for caching', 'postMessage communication', 'Structured clone algorithm'],
              resources: [
                { title: 'MDN: Using Web Workers', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers', type: 'doc' },
              ],
            },
            {
              id: 'js_design_patterns',
              title: 'Design Patterns & Clean Code',
              description: 'Singleton, Factory, Observer, Pub/Sub, and functional programming patterns.',
              details: 'Implement robust architectural patterns in JavaScript, including composition over inheritance, pure functions, immutability, and pub-sub event emitters.',
              subtopics: ['Observer / Pub-Sub pattern', 'Factory & Builder patterns', 'Currying & Function Composition', 'Immutability best practices'],
              resources: [
                { title: 'Refactoring Guru: JavaScript Design Patterns', url: 'https://refactoring.guru/design-patterns/javascript', type: 'doc' },
              ],
            },
          ],
        },
      ],
    },
  },

  // ==========================================
  // FRONTEND WEB: TYPESCRIPT
  // ==========================================
  typescript: {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend_web',
    tagline: 'JavaScript with syntax for types',
    levels: {
      beginner: [
        {
          id: 'ts_basics',
          title: 'TypeScript Foundations',
          description: 'Type annotations, basic types, interfaces, and type aliases.',
          topics: [
            {
              id: 'ts_types_interfaces',
              title: 'Basic Types & Interfaces',
              description: 'Primitive types, object types, interfaces, and optional properties.',
              details: 'TypeScript adds static type definitions on top of JavaScript. Learn basic types, interfaces for contract definitions, readonly and optional modifiers.',
              subtopics: ['string, number, boolean, any, unknown, void', 'Interfaces vs Type aliases', 'Optional (?) and readonly properties', 'Type inference'],
              resources: [
                { title: 'TypeScript Handbook: The Basics', url: 'https://www.typescriptlang.org/docs/handbook/2/basic-types.html', type: 'doc' },
              ],
            },
            {
              id: 'ts_functions',
              title: 'Typing Functions & Arrays',
              description: 'Parameter types, return types, tuple types, and union types.',
              details: 'Define clear function signatures with typed parameters and return values. Learn union types for variables that can take multiple formats.',
              subtopics: ['Function signatures', 'Union types (|) and intersection (&)', 'Tuples and typed arrays', 'Literal types'],
              resources: [
                { title: 'TypeScript Handbook: More on Functions', url: 'https://www.typescriptlang.org/docs/handbook/2/functions.html', type: 'doc' },
              ],
            },
          ],
        },
      ],
      intermediate: [
        {
          id: 'ts_generics',
          title: 'Generics & Utility Types',
          description: 'Type parameters, generic constraints, and built-in utility types.',
          topics: [
            {
              id: 'ts_generics_intro',
              title: 'Generics & Constraints',
              description: 'Creating reusable, type-safe components and functions with <T>.',
              details: 'Generics allow writing flexible and reusable code while preserving full type safety. Use generic constraints (`extends`) to limit accepted types.',
              subtopics: ['Generic functions and classes', 'Generic interfaces', 'Type constraints (T extends keyof)', 'Default generic types'],
              resources: [
                { title: 'TypeScript Handbook: Generics', url: 'https://www.typescriptlang.org/docs/handbook/2/generics.html', type: 'doc' },
              ],
            },
            {
              id: 'ts_utilities',
              title: 'Built-in Utility Types',
              description: 'Partial, Required, Pick, Omit, Record, Readonly, and ReturnType.',
              details: 'TypeScript provides built-in transformations for types that save time and reduce duplication across complex domain models.',
              subtopics: ['Partial<T> and Required<T>', 'Pick<T, K> and Omit<T, K>', 'Record<K, T>', 'ReturnType<T> and Parameters<T>'],
              resources: [
                { title: 'TypeScript Utility Types Reference', url: 'https://www.typescriptlang.org/docs/handbook/utility-types.html', type: 'doc' },
              ],
            },
          ],
        },
      ],
      advanced: [
        {
          id: 'ts_advanced_typing',
          title: 'Conditional Types & Metaprogramming',
          description: 'infer keyword, template literal types, mapped types, and declaration files.',
          topics: [
            {
              id: 'ts_conditional_types',
              title: 'Conditional Types & "infer"',
              description: 'T extends U ? X : Y syntax, type extraction, and recursive types.',
              details: 'Conditional types enable powerful type-level logic and pattern matching. Use `infer` to extract embedded return types or array item types dynamically.',
              subtopics: ['Conditional type syntax', 'infer keyword for pattern matching', 'Distributive conditional types', 'Recursive and mapped types'],
              resources: [
                { title: 'TypeScript Conditional Types', url: 'https://www.typescriptlang.org/docs/handbook/2/conditional-types.html', type: 'doc' },
              ],
            },
            {
              id: 'ts_declarations',
              title: 'Ambient Declarations & tsconfig Tuning',
              description: 'Writing .d.ts files, strict compiler flags, and monorepo path aliases.',
              details: 'Master compiler options in tsconfig.json (strict, noUncheckedIndexedAccess), author custom ambient declaration files, and configure module resolution.',
              subtopics: ['.d.ts type declaration files', 'Strict mode flags', 'Path mapping and project references', 'Module augmentation'],
              resources: [
                { title: 'TypeScript TSConfig Reference', url: 'https://www.typescriptlang.org/tsconfig', type: 'doc' },
              ],
            },
          ],
        },
      ],
    },
  },

  // ==========================================
  // FRONTEND WEB: REACT.JS
  // ==========================================
  reactjs: {
    id: 'reactjs',
    name: 'React.js',
    category: 'frontend_web',
    tagline: 'The library for web and native user interfaces',
    levels: {
      beginner: [
        {
          id: 'react_components',
          title: 'Components & JSX',
          description: 'Understanding JSX, functional components, props, and rendering.',
          topics: [
            {
              id: 'react_jsx_props',
              title: 'JSX & Component Props',
              description: 'Writing JSX elements, composing components, and passing props.',
              details: 'JSX allows writing HTML-like markup inside JavaScript. Learn component composition, unidirectional data flow with props, and children props.',
              subtopics: ['JSX syntax and rules', 'Passing & destructuring props', 'Conditional rendering (&&, ternary)', 'Rendering lists with keys'],
              resources: [
                { title: 'React.dev: Your First Component', url: 'https://react.dev/learn/your-first-component', type: 'doc' },
              ],
            },
            {
              id: 'react_state_basics',
              title: 'State with useState',
              description: 'Adding memory to components and handling user interactions.',
              details: 'State preserves values between renders and triggers re-renders when updated. Practice updater functions, state immutability, and lifting state up.',
              subtopics: ['useState hook anatomy', 'State updater functions (prev => ...)', 'Updating objects and arrays in state', 'Lifting state up'],
              resources: [
                { title: 'React.dev: State: A Component\'s Memory', url: 'https://react.dev/learn/state-a-components-memory', type: 'doc' },
              ],
            },
          ],
        },
      ],
      intermediate: [
        {
          id: 'react_hooks_deep',
          title: 'Hooks & Side Effects',
          description: 'useEffect lifecycle, useRef, useMemo, useCallback, and custom hooks.',
          topics: [
            {
              id: 'react_use_effect',
              title: 'Side Effects with useEffect',
              description: 'Data fetching, subscription cleanup, and dependency arrays.',
              details: 'Effects synchronize components with external systems like APIs, timers, and DOM nodes. Understand dependency arrays and cleanup functions.',
              subtopics: ['Dependency array rules', 'Cleanup functions for timers/listeners', 'Data fetching patterns with AbortController', 'Avoiding unnecessary effects'],
              resources: [
                { title: 'React.dev: Synchronizing with Effects', url: 'https://react.dev/learn/synchronizing-with-effects', type: 'doc' },
              ],
            },
            {
              id: 'react_performance',
              title: 'Performance: useMemo & useCallback',
              description: 'Memoizing expensive computations and function references.',
              details: 'Avoid redundant calculations with useMemo and prevent child re-renders with useCallback and React.memo when passing callbacks to optimized children.',
              subtopics: ['React.memo for component memoization', 'useMemo for heavy calculations', 'useCallback for stable callbacks', 'React DevTools Profiler'],
              resources: [
                { title: 'React.dev: useMemo and useCallback', url: 'https://react.dev/reference/react/useMemo', type: 'doc' },
              ],
            },
            {
              id: 'react_custom_hooks',
              title: 'Creating Custom Hooks',
              description: 'Extracting and reusing stateful component logic.',
              details: 'Custom hooks allow you to package and reuse stateful logic cleanly across multiple components without altering component hierarchy.',
              subtopics: ['Naming conventions (use...)', 'Composing built-in hooks', 'Returning state and actions', 'Testing custom hooks'],
              resources: [
                { title: 'React.dev: Reusing Logic with Custom Hooks', url: 'https://react.dev/learn/reusing-logic-with-custom-hooks', type: 'doc' },
              ],
            },
          ],
        },
      ],
      advanced: [
        {
          id: 'react_concurrency',
          title: 'React 19 & Concurrent Rendering',
          description: 'Transitions, Suspense, Server Actions, useActionState, and Compiler.',
          topics: [
            {
              id: 'react_transitions_suspense',
              title: 'useTransition & Suspense',
              description: 'Non-blocking UI updates, concurrent rendering, and fallback states.',
              details: 'useTransition marks state updates as non-urgent transitions, keeping the user interface responsive during heavy renders. Suspense coordinates loading.',
              subtopics: ['startTransition & isPending', 'Suspense boundaries for data & components', 'useDeferredValue for search inputs', 'Error Boundaries'],
              resources: [
                { title: 'React.dev: Concurrent Features', url: 'https://react.dev/reference/react/useTransition', type: 'doc' },
              ],
            },
            {
              id: 'react_actions_modern',
              title: 'React 19 Hooks: use, useActionState, useOptimistic',
              description: 'Modern asynchronous workflows and optimistic UI updates.',
              details: 'React 19 introduces native hooks for handling form actions, async data resolution with `use()`, and instant UI updates with `useOptimistic()`.',
              subtopics: ['use() hook with Promises and Context', 'useActionState for form handling', 'useOptimistic for instant user feedback', 'React Compiler auto-memoization'],
              resources: [
                { title: 'React 19 Release Notes', url: 'https://react.dev/blog/2024/12/05/react-19', type: 'doc' },
              ],
            },
          ],
        },
      ],
    },
  },

  // ==========================================
  // FRONTEND WEB: NEXT.JS
  // ==========================================
  nextjs: {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend_web',
    tagline: 'The React Framework for the Web',
    levels: {
      beginner: [
        {
          id: 'next_app_router',
          title: 'App Router Fundamentals',
          description: 'File-system routing, layouts, pages, and navigation.',
          topics: [
            {
              id: 'next_routing',
              title: 'Pages, Layouts & Route Groups',
              description: 'page.tsx, layout.tsx, template.tsx, and route grouping with (group).',
              details: 'Next.js App Router uses folder structures to define URL routes. Nested layouts preserve state across navigation while subpages render content.',
              subtopics: ['Folder-based routing conventions', 'Root Layout and nested layouts', 'Link component and prefetching', 'Dynamic routes ([slug])'],
              resources: [
                { title: 'Next.js Routing Fundamentals', url: 'https://nextjs.org/docs/app/building-your-application/routing', type: 'doc' },
              ],
            },
          ],
        },
      ],
      intermediate: [
        {
          id: 'next_rsc',
          title: 'Server & Client Components',
          description: 'React Server Components (RSC), "use client", and data fetching.',
          topics: [
            {
              id: 'next_rsc_pattern',
              title: 'RSC Architecture & Boundaries',
              description: 'Understanding when to render on the server vs client.',
              details: 'Server Components execute only on the server, producing zero client bundle size and allowing direct database access. Use "use client" for interactivity.',
              subtopics: ['Server Components by default', '"use client" directive rules', 'Passing props between Server and Client', 'Streaming with Suspense'],
              resources: [
                { title: 'Next.js Server Components Guide', url: 'https://nextjs.org/docs/app/building-your-application/rendering/server-components', type: 'doc' },
              ],
            },
          ],
        },
      ],
      advanced: [
        {
          id: 'next_caching_actions',
          title: 'Server Actions & Caching Strategies',
          description: 'Mutations with Server Actions, revalidateTag, and ISR.',
          topics: [
            {
              id: 'next_server_actions',
              title: 'Server Actions & Mutations',
              description: 'Handling form submissions and server mutations seamlessly.',
              details: 'Server Actions allow client forms and hooks to invoke server functions without creating dedicated REST API routes. Combine with revalidatePath and revalidateTag.',
              subtopics: ['"use server" directive', 'revalidatePath & revalidateTag', 'Optimistic updates with useOptimistic', 'Authentication & Middleware'],
              resources: [
                { title: 'Next.js Server Actions Reference', url: 'https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations', type: 'doc' },
              ],
            },
          ],
        },
      ],
    },
  },

  // ==========================================
  // FRONTEND WEB: VUE.JS
  // ==========================================
  vuejs: {
    id: 'vuejs',
    name: 'Vue.js',
    category: 'frontend_web',
    tagline: 'The Progressive JavaScript Framework',
    levels: {
      beginner: [
        {
          id: 'vue_core',
          title: 'Vue 3 & Composition API',
          description: 'Single-File Components (SFC), ref, reactive, and directives.',
          topics: [
            {
              id: 'vue_sfc_basics',
              title: 'SFCs & Reactivity (ref, reactive)',
              description: '<template>, <script setup>, <style>, and reactive state.',
              details: 'Vue SFCs combine template, logic, and scoped styles in one file. Master `ref` for primitive reactive references and `reactive` for objects.',
              subtopics: ['<script setup> syntax', 'ref vs reactive', 'Directives (v-if, v-for, v-model, v-bind, v-on)', 'Computed properties'],
              resources: [
                { title: 'Vue.js Official Guide', url: 'https://vuejs.org/guide/introduction.html', type: 'doc' },
              ],
            },
          ],
        },
      ],
      intermediate: [
        {
          id: 'vue_ecosystem',
          title: 'Pinia & Vue Router',
          description: 'State management with Pinia, client-side routing, and composables.',
          topics: [
            {
              id: 'vue_pinia_router',
              title: 'Pinia Stores & Navigation Guards',
              description: 'Defining stores, actions, getters, and protecting routes.',
              details: 'Pinia is the modern official state management library for Vue. Learn store composition, hydration, and routing with navigation guards.',
              subtopics: ['Defining Pinia stores', 'Actions & Getters', 'Vue Router history and params', 'Navigation guards (beforeEach)'],
              resources: [
                { title: 'Pinia Documentation', url: 'https://pinia.vuejs.org/', type: 'doc' },
              ],
            },
          ],
        },
      ],
      advanced: [
        {
          id: 'vue_internals',
          title: 'Advanced Reactivity & Performance',
          description: 'Custom directives, render functions, Provide/Inject, and Nuxt 3.',
          topics: [
            {
              id: 'vue_internals_topic',
              title: 'Reactivity Transform & SSR with Nuxt',
              description: 'Proxy-based reactivity under the hood and full-stack Nuxt.',
              details: 'Explore how Vue tracks dependencies with ES6 Proxies, author custom directives, use Teleport, and build full-stack SSR apps with Nuxt 3.',
              subtopics: ['Proxy reactivity internals', 'Teleport & KeepAlive', 'Provide & Inject for dependency injection', 'Nuxt 3 SSR and auto-imports'],
              resources: [
                { title: 'Nuxt 3 Documentation', url: 'https://nuxt.com/docs', type: 'doc' },
              ],
            },
          ],
        },
      ],
    },
  },

  // ==========================================
  // FRONTEND WEB: ANGULAR
  // ==========================================
  angular: {
    id: 'angular',
    name: 'Angular',
    category: 'frontend_web',
    tagline: 'Deliver web apps with confidence',
    levels: {
      beginner: [
        {
          id: 'ng_basics',
          title: 'Standalone Components & Templates',
          description: 'Angular 17+ standalone architecture, control flow, and bindings.',
          topics: [
            {
              id: 'ng_standalone',
              title: 'Standalone Components & @if / @for',
              description: 'Modern Angular components without NgModules and new built-in control flow.',
              details: 'Angular 17+ simplifies development with standalone components and fast built-in control flow syntax (@if, @for, @switch) replacing *ngIf and *ngFor.',
              subtopics: ['Standalone component decorator', 'New control flow syntax (@if, @for)', 'Interpolation and property binding', 'Event binding and two-way [(ngModel)]'],
              resources: [
                { title: 'Angular Essentials', url: 'https://angular.dev/overview', type: 'doc' },
              ],
            },
          ],
        },
      ],
      intermediate: [
        {
          id: 'ng_signals_di',
          title: 'Signals & Dependency Injection',
          description: 'Angular Signals, reactive primitives, services, and RxJS.',
          topics: [
            {
              id: 'ng_signals_topic',
              title: 'Angular Signals & RxJS Interop',
              description: 'signal(), computed(), effect(), and toSignal() conversions.',
              details: 'Signals provide fine-grained reactivity in Angular, replacing zone.js dirty checking. Understand how to interop between Observables and Signals.',
              subtopics: ['Writable signals & computed signals', 'Effects for side-effects', 'Injectable services & hierarchical DI', 'RxJS Observable pipelines & operators'],
              resources: [
                { title: 'Angular Signals Guide', url: 'https://angular.dev/guide/signals', type: 'doc' },
              ],
            },
          ],
        },
      ],
      advanced: [
        {
          id: 'ng_advanced',
          title: 'Zoneless Change Detection & Performance',
          description: 'Zoneless Angular, deferrable views (@defer), and micro-frontends.',
          topics: [
            {
              id: 'ng_zoneless',
              title: 'Zoneless Architecture & Deferrable Views',
              description: 'Blazing performance with @defer triggers and zoneless apps.',
              details: 'Leverage `@defer` to lazy-load UI sections based on viewport, interaction, or timer. Configure zoneless change detection for optimal bundle and CPU efficiency.',
              subtopics: ['@defer (on viewport, on idle, on interaction)', 'Zoneless change detection mode', 'Custom structural directives', 'Module Federation with Angular'],
              resources: [
                { title: 'Angular Deferrable Views', url: 'https://angular.dev/guide/defer', type: 'doc' },
              ],
            },
          ],
        },
      ],
    },
  },

  // ==========================================
  // FRONTEND MOBILE: REACT NATIVE
  // ==========================================
  react_native: {
    id: 'react_native',
    name: 'React Native',
    category: 'frontend_mobile',
    subcategory: 'cross_platform',
    tagline: 'Learn once, write anywhere',
    levels: {
      beginner: [
        {
          id: 'rn_core_basics',
          title: 'Core Components & Layout',
          description: 'View, Text, Image, ScrollView, FlatList, and Flexbox styling.',
          topics: [
            {
              id: 'rn_core_components',
              title: 'Native Core Components & Styling',
              description: 'Building mobile screens with View, Text, StyleSheet, and Flexbox.',
              details: 'React Native translates React components into native iOS and Android views. Master Flexbox layout (flexDirection defaults to column), StyleSheet API, and Safe Area handling.',
              subtopics: ['View, Text, Image, TouchableOpacity/Pressable', 'Flexbox layout on mobile (row vs column)', 'StyleSheet.create & pixel density', 'SafeAreaProvider & insets'],
              resources: [
                { title: 'React Native Core Components', url: 'https://reactnative.dev/docs/intro-react-native-components', type: 'doc' },
              ],
            },
            {
              id: 'rn_lists',
              title: 'Performant Lists with FlatList',
              description: 'Rendering large lists efficiently with recycling, keys, and separators.',
              details: 'FlatList renders only items currently visible on screen to preserve mobile memory. Master keyExtractor, renderItem, ItemSeparatorComponent, and ListEmptyComponent.',
              subtopics: ['FlatList vs ScrollView tradeoffs', 'keyExtractor best practices', 'onEndReached for infinite scrolling', 'SectionList for grouped data'],
              resources: [
                { title: 'React Native FlatList Guide', url: 'https://reactnative.dev/docs/flatlist', type: 'doc' },
              ],
            },
          ],
        },
      ],
      intermediate: [
        {
          id: 'rn_nav_storage',
          title: 'Navigation & Local Persistence',
          description: 'React Navigation (Stack & Tabs), AsyncStorage, and Gestures.',
          topics: [
            {
              id: 'rn_react_navigation',
              title: 'React Navigation 7 (Stack & Bottom Tabs)',
              description: 'Configuring native stack navigation, bottom tab bars, and route params.',
              details: 'React Navigation is the de facto routing library for React Native. Learn createNativeStackNavigator, createBottomTabNavigator, screen options, and passing route params.',
              subtopics: ['NativeStackNavigator setup', 'BottomTabNavigator with custom icons', 'useNavigation & useRoute hooks', 'Passing and typing screen params'],
              resources: [
                { title: 'React Navigation 7 Docs', url: 'https://reactnavigation.org/docs/getting-started', type: 'doc' },
              ],
            },
            {
              id: 'rn_async_storage',
              title: 'AsyncStorage & Offline State',
              description: 'Persisting user settings, tokens, bookmarks, and caching.',
              details: 'AsyncStorage is an asynchronous, unencrypted, key-value storage system for React Native. Learn safe serialization, clearing data, and building offline-first UX.',
              subtopics: ['getItem, setItem, removeItem', 'JSON serialization helpers', 'MultiGet and batch operations', 'Syncing state on app launch'],
              resources: [
                { title: 'AsyncStorage Official Docs', url: 'https://react-native-async-storage.github.io/async-storage/', type: 'doc' },
              ],
            },
          ],
        },
      ],
      advanced: [
        {
          id: 'rn_new_arch',
          title: 'The New Architecture & Performance',
          description: 'Fabric renderer, TurboModules, Bridgeless mode, and Reanimated.',
          topics: [
            {
              id: 'rn_fabric_turbomodules',
              title: 'Fabric, TurboModules & JSI',
              description: 'Direct C++ JavaScript Interface (JSI) replacing the old JSON bridge.',
              details: 'The New Architecture eliminates the asynchronous JSON bridge. JSI allows synchronous invocation between JS and C++, Fabric offers synchronous UI layout, and TurboModules load lazily.',
              subtopics: ['JavaScript Interface (JSI) concept', 'Fabric renderer benefits', 'TurboModules on-demand initialization', 'Bridgeless mode configuration'],
              resources: [
                { title: 'React Native New Architecture Guide', url: 'https://reactnative.dev/docs/the-new-architecture/landing-page', type: 'doc' },
              ],
            },
            {
              id: 'rn_animations_reanimated',
              title: 'Animations with React Native Reanimated',
              description: 'Running 60/120fps animations directly on the native UI thread.',
              details: 'Reanimated allows running complex gesture-driven animations directly on the UI thread without crossing the JS bridge using worklets, shared values, and gesture handlers.',
              subtopics: ['useSharedValue and useAnimatedStyle', 'withTiming and withSpring transitions', 'Worklets and UI thread execution', 'Gesture Handler integration'],
              resources: [
                { title: 'React Native Reanimated Docs', url: 'https://docs.swmansion.com/react-native-reanimated/', type: 'doc' },
              ],
            },
          ],
        },
      ],
    },
  },

  // ==========================================
  // FRONTEND MOBILE: FLUTTER
  // ==========================================
  flutter: {
    id: 'flutter',
    name: 'Flutter',
    category: 'frontend_mobile',
    subcategory: 'cross_platform',
    tagline: 'Multi-platform from a single codebase',
    levels: {
      beginner: [
        {
          id: 'flutter_widgets',
          title: 'Dart & Flutter Widget Tree',
          description: 'StatelessWidget, StatefulWidget, Scaffold, and basic layouts.',
          topics: [
            {
              id: 'flutter_widget_basics',
              title: 'Stateless vs Stateful Widgets',
              description: 'Widget lifecycle, setState(), BuildContext, and Container/Column/Row.',
              details: 'Everything in Flutter is a widget. Understand the difference between immutable StatelessWidget and StatefulWidget with mutable State and setState() updates.',
              subtopics: ['StatelessWidget declaration', 'StatefulWidget & setState()', 'Scaffold, AppBar, FloatingActionButton', 'Row, Column, Stack, and Flex layouts'],
              resources: [
                { title: 'Flutter Widget Catalog', url: 'https://docs.flutter.dev/ui/widgets', type: 'doc' },
              ],
            },
          ],
        },
      ],
      intermediate: [
        {
          id: 'flutter_state_mgmt',
          title: 'State Management & Navigation',
          description: 'Provider, Riverpod, Bloc, and Navigator 2.0 (GoRouter).',
          topics: [
            {
              id: 'flutter_state_options',
              title: 'Riverpod & Bloc Architectures',
              description: 'Predictable unidirectional state flows and dependency injection.',
              details: 'Master enterprise state management in Flutter. Compare Riverpod (compile-safe, no BuildContext needed) with Bloc (Event-State event-driven architecture).',
              subtopics: ['Riverpod Providers and ConsumerWidget', 'Bloc, Events, and States', 'GoRouter declarative routing', 'Http client and json_serializable'],
              resources: [
                { title: 'Riverpod Documentation', url: 'https://riverpod.dev/', type: 'doc' },
              ],
            },
          ],
        },
      ],
      advanced: [
        {
          id: 'flutter_internals',
          title: 'Custom Rendering & Platform Channels',
          description: 'CustomPainter, RenderObjects, FFI, and MethodChannels.',
          topics: [
            {
              id: 'flutter_engine_channels',
              title: 'Custom Painter & Native Method Channels',
              description: 'Interacting with native iOS/Android code and low-level canvas painting.',
              details: 'Use MethodChannels and EventChannels to invoke native Kotlin/Swift APIs. Implement CustomPainter to draw custom graphics and shaders directly on canvas.',
              subtopics: ['MethodChannel and EventChannel communication', 'CustomPainter & Canvas API', 'RenderObject & Pipeline Owner', 'Dart FFI (Foreign Function Interface)'],
              resources: [
                { title: 'Writing custom platform-specific code in Flutter', url: 'https://docs.flutter.dev/platform-integration/platform-channels', type: 'doc' },
              ],
            },
          ],
        },
      ],
    },
  },

  // ==========================================
  // FRONTEND MOBILE: KOTLIN
  // ==========================================
  kotlin: {
    id: 'kotlin',
    name: 'Kotlin',
    category: 'frontend_mobile',
    subcategory: 'android',
    tagline: 'A modern, concise, and safe programming language',
    levels: {
      beginner: [
        {
          id: 'kt_basics',
          title: 'Kotlin Fundamentals',
          description: 'Null safety, val/var, data classes, and extension functions.',
          topics: [
            {
              id: 'kt_null_safety',
              title: 'Null Safety & Smart Casts',
              description: 'Eliminating NullPointerExceptions with nullable types (?.) and (?:).',
              details: 'Kotlin distinguishes between nullable and non-nullable types at compile time. Learn safe calls, the Elvis operator, and automatic smart casting.',
              subtopics: ['val vs var', 'Nullable types (String?) vs Non-null', 'Elvis operator (?:)', 'Safe calls (?.) and not-null assertions (!!)'],
              resources: [
                { title: 'Kotlin Docs: Null Safety', url: 'https://kotlinlang.org/docs/null-safety.html', type: 'doc' },
              ],
            },
          ],
        },
      ],
      intermediate: [
        {
          id: 'kt_coroutines',
          title: 'Coroutines & Asynchronous Flow',
          description: 'suspend functions, CoroutineScope, Dispatchers, and StateFlow.',
          topics: [
            {
              id: 'kt_coroutines_topic',
              title: 'Coroutines & Structured Concurrency',
              description: 'Lightweight threads, viewModelScope, and Dispatchers.IO.',
              details: 'Coroutines simplify asynchronous programming by suspending execution without blocking threads. Master structured concurrency, scopes, and jobs.',
              subtopics: ['suspend keyword', 'CoroutineScope and Dispatchers (Main, IO, Default)', 'launch vs async/await', 'StateFlow and SharedFlow for reactive streams'],
              resources: [
                { title: 'Kotlin Coroutines Guide', url: 'https://kotlinlang.org/docs/coroutines-overview.html', type: 'doc' },
              ],
            },
          ],
        },
      ],
      advanced: [
        {
          id: 'kt_advanced',
          title: 'Generics, Inlines & KMP',
          description: 'Reified type parameters, inline classes, and Kotlin Multiplatform.',
          topics: [
            {
              id: 'kt_kmp_topic',
              title: 'Kotlin Multiplatform (KMP) & Reified Generics',
              description: 'Sharing business logic across Android, iOS, Desktop, and Web.',
              details: 'Write shared business logic with Kotlin Multiplatform, utilizing `expect`/`actual` declarations, inline value classes, and reified type arguments.',
              subtopics: ['expect / actual declarations', 'reified inline functions', 'Contracts and DSL authoring', 'KMP shared architecture'],
              resources: [
                { title: 'Kotlin Multiplatform Documentation', url: 'https://www.jetbrains.com/help/kotlin-multiplatform-dev/get-started.html', type: 'doc' },
              ],
            },
          ],
        },
      ],
    },
  },

  // ==========================================
  // FRONTEND MOBILE: ANDROID DEVELOPMENT
  // ==========================================
  android_dev: {
    id: 'android_dev',
    name: 'Android Development',
    category: 'frontend_mobile',
    subcategory: 'android',
    tagline: 'Modern Native Android with Jetpack Compose',
    levels: {
      beginner: [
        {
          id: 'and_compose_basics',
          title: 'Jetpack Compose & UI',
          description: 'Declarative Android UI with @Composable, Modifiers, and Material 3.',
          topics: [
            {
              id: 'and_compose_ui',
              title: 'Compose Layouts & Modifiers',
              description: 'Box, Column, Row, LazyColumn, and Modifier chain ordering.',
              details: 'Jetpack Compose is Android\'s modern toolkit for building native UI. Learn how composable functions emit UI elements, and how Modifiers customize layout and behavior.',
              subtopics: ['@Composable functions', 'Modifier chaining rules', 'LazyColumn & LazyRow (RecyclerView alternative)', 'MaterialTheme and Color schemes'],
              resources: [
                { title: 'Jetpack Compose Basics', url: 'https://developer.android.com/develop/ui/compose/tutorial', type: 'doc' },
              ],
            },
          ],
        },
      ],
      intermediate: [
        {
          id: 'and_arch_components',
          title: 'Android Architecture Components',
          description: 'ViewModel, Room Database, Navigation Compose, and Retrofit.',
          topics: [
            {
              id: 'and_viewmodel_room',
              title: 'MVVM Architecture with ViewModel & Room',
              description: 'Separation of concerns, surviving configuration changes, and local SQLite.',
              details: 'Implement clean MVVM architecture using Jetpack ViewModel for state retention and Room SQLite database for robust offline caching with DAO annotations.',
              subtopics: ['ViewModel & SavedStateHandle', 'Room Database, Entity, and DAO', 'Retrofit & OkHttp for networking', 'Navigation Compose destination graphs'],
              resources: [
                { title: 'Guide to app architecture', url: 'https://developer.android.com/topic/architecture', type: 'doc' },
              ],
            },
          ],
        },
      ],
      advanced: [
        {
          id: 'and_advanced_topics',
          title: 'Dependency Injection & Background Work',
          description: 'Hilt / Dagger DI, WorkManager, App Performance, and Proguard.',
          topics: [
            {
              id: 'and_hilt_workmanager',
              title: 'Hilt Dependency Injection & WorkManager',
              description: 'Automating dependency graphs and guaranteed background task execution.',
              details: 'Hilt simplifies Dagger DI on Android with @HiltAndroidApp and @AndroidEntryPoint. Use WorkManager for deferrable, guaranteed background work with battery constraints.',
              subtopics: ['@HiltViewModel and inject scopes', 'WorkManager Worker with Constraints', 'Baseline Profiles & Macrobenchmark', 'R8 shrinking and Proguard rules'],
              resources: [
                { title: 'Dependency injection with Hilt', url: 'https://developer.android.com/training/dependency-injection/hilt-android', type: 'doc' },
              ],
            },
          ],
        },
      ],
    },
  },

  // ==========================================
  // FRONTEND MOBILE: SWIFT
  // ==========================================
  swift: {
    id: 'swift',
    name: 'Swift',
    category: 'frontend_mobile',
    subcategory: 'ios',
    tagline: 'Powerful and intuitive programming language for Apple platforms',
    levels: {
      beginner: [
        {
          id: 'swift_basics',
          title: 'Swift Syntax & Optionals',
          description: 'Variables, optionals, control flow, structs, and enums.',
          topics: [
            {
              id: 'swift_optionals_structs',
              title: 'Optionals & Value Types (Structs)',
              description: 'if let, guard let, optional chaining, and struct vs class differences.',
              details: 'Optionals handle the absence of value safely in Swift. Structs are value types copied upon assignment, providing immutability and thread safety.',
              subtopics: ['let vs var constants', 'Optional binding (if let, guard let)', 'Nil-coalescing operator (??)', 'Structs (Value) vs Classes (Reference)'],
              resources: [
                { title: 'The Swift Programming Language Tour', url: 'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/guidedtour/', type: 'doc' },
              ],
            },
          ],
        },
      ],
      intermediate: [
        {
          id: 'swift_protocols',
          title: 'Protocols & Closures',
          description: 'Protocol-oriented programming, trailing closures, and memory management (ARC).',
          topics: [
            {
              id: 'swift_pop_arc',
              title: 'Protocols, Extensions & ARC',
              description: 'Composing behavior with protocols and preventing retain cycles with [weak self].',
              details: 'Swift emphasizes Protocol-Oriented Programming (POP). Master Automatic Reference Counting (ARC) and prevent strong reference cycles with weak and unowned captures.',
              subtopics: ['Protocol definitions and conformance', 'Protocol extensions with default implementations', 'Trailing closures & escaping', '[weak self] capture lists in ARC'],
              resources: [
                { title: 'Swift Protocols Guide', url: 'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/protocols/', type: 'doc' },
              ],
            },
          ],
        },
      ],
      advanced: [
        {
          id: 'swift_concurrency',
          title: 'Modern Swift Concurrency',
          description: 'async/await, Actors, TaskGroup, and Sendable protocol.',
          topics: [
            {
              id: 'swift_actors_async',
              title: 'Actors & Data Race Safety',
              description: 'Eliminating data races at compile time with Swift 6 structured concurrency.',
              details: 'Swift Concurrency replaces GCD with async/await. Actors protect mutable state through mutual exclusion, and Sendable types ensure safe data transfers across tasks.',
              subtopics: ['async / await and Task blocks', 'actor keyword for synchronization', 'MainActor for UI updates', 'Sendable types & Swift 6 strict concurrency'],
              resources: [
                { title: 'Swift Concurrency Documentation', url: 'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency/', type: 'doc' },
              ],
            },
          ],
        },
      ],
    },
  },

  // ==========================================
  // FRONTEND MOBILE: IOS DEVELOPMENT
  // ==========================================
  ios_dev: {
    id: 'ios_dev',
    name: 'iOS Development',
    category: 'frontend_mobile',
    subcategory: 'ios',
    tagline: 'Modern Native iOS Engineering with SwiftUI',
    levels: {
      beginner: [
        {
          id: 'ios_swiftui_basics',
          title: 'SwiftUI Views & State',
          description: 'VStack, HStack, List, @State, and ViewModifiers.',
          topics: [
            {
              id: 'ios_swiftui_views',
              title: 'Declarative Views & @State',
              description: 'Building interactive screens using SwiftUI declarative syntax.',
              details: 'SwiftUI renders views declaratively. Learn how body property returns `some View`, how @State triggers automatic UI invalidation, and standard layout containers.',
              subtopics: ['some View return type', 'VStack, HStack, ZStack', '@State and @Binding property wrappers', 'Common modifiers (.padding, .background, .clipShape)'],
              resources: [
                { title: 'Apple Developer: SwiftUI Tutorials', url: 'https://developer.apple.com/tutorials/swiftui', type: 'doc' },
              ],
            },
          ],
        },
      ],
      intermediate: [
        {
          id: 'ios_data_nav',
          title: 'Observable & NavigationStack',
          description: '@Observable macro (iOS 17+), SwiftData, and NavigationStack.',
          topics: [
            {
              id: 'ios_observable_swiftdata',
              title: 'Observation Framework & SwiftData',
              description: 'Modern state modeling with @Observable and SwiftData persistence.',
              details: 'iOS 17 replaced ObservableObject with the @Observable macro for fine-grained dependency tracking. Use SwiftData for effortless model persistence backed by Core Data.',
              subtopics: ['@Observable macro syntax', '@Bindable for form controls', 'SwiftData @Model classes and ModelContext', 'NavigationStack and NavigationPath'],
              resources: [
                { title: 'Apple Developer: Managing model data with Observation', url: 'https://developer.apple.com/documentation/swiftui/managing-model-data-in-your-app', type: 'doc' },
              ],
            },
          ],
        },
      ],
      advanced: [
        {
          id: 'ios_advanced_arch',
          title: 'Architecture, Instruments & App Store',
          description: 'The Composable Architecture (TCA), Instruments profiling, and CI/CD.',
          topics: [
            {
              id: 'ios_profiling_tca',
              title: 'Instruments Profiling & Architecture (TCA / Clean)',
              description: 'Hunting memory leaks, Time Profiler, and scalable architectures.',
              details: 'Profile your application using Xcode Instruments (Leaks, Time Profiler). Adopt scalable architectures like The Composable Architecture (TCA) or Clean MVVM with dependency injection.',
              subtopics: ['Xcode Instruments (Leaks, Allocations)', 'SwiftUI view rendering performance', 'The Composable Architecture (TCA) concepts', 'App Store submission and TestFlight'],
              resources: [
                { title: 'Point-Free: The Composable Architecture', url: 'https://www.pointfree.co/collections/composable-architecture', type: 'doc' },
              ],
            },
          ],
        },
      ],
    },
  },
};

/**
 * Returns the roadmap for a given technology identifier.
 * @param {string} techId
 * @returns {object|null}
 */
export const getRoadmapData = (techId) => {
  if (!techId) return null;
  const normalizedId = String(techId).toLowerCase().trim();
  return ROADMAP_DATA[normalizedId] || null;
};

export default ROADMAP_DATA;
