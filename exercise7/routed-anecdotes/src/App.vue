<template>
<span id="app">
  <main>
    <nav>
      <router-link to="/">Anecdotes</router-link>
      <router-link to="/add-anecdote">Add anecdote</router-link>
    </nav>
    <router-view />
  </main>

  <footer>
    <a href="https://github.com/banaanihillo">
      banaanihillo on GitHub
    </a>
  </footer>
</span>
</template>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  background-color: black;
  color: magenta;
}

a:link {
  color: aqua;
}

a:visited {
  color: violet;
}

nav {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  gap: 1em;
}

input,
button {
  background-color: plum;
}

ul {
  padding-left: 0;
}

footer {
  padding: 2em;
  border: 1px solid darkmagenta;
}
</style>
