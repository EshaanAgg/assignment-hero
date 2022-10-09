<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/logo.png" alt="Logo" />
      <h1><NuxtLink to="/">Assignment Hero</NuxtLink></h1>
      <div class="links">
        <button>Logout</button>
        <NuxtLink class="btn" to="/signup">Sign Up</NuxtLink>
        <NuxtLink class="btn" to="/login">Login</NuxtLink>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}
nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
nav h1 {
  margin-left: 20px;
}
nav .links {
  margin-left: auto;
}
nav .links a,
button {
  margin-left: 16px;
  font-size: 14px;
}
nav img {
  max-height: 60px;
}
</style>
