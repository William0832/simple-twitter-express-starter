<template>
  <div id="app" class="vh-100 overflow-hidden">
    <Navbar />
    <main role="main" class="mt-5 bg-white flex-grow-1 overflow-hidden">
      <router-view />
    </main>
  </div>
</template>

<script>
// import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";

window.checkAndAttachMapScript = function(callback) {
  if (window.google) {
    // If you're using vue cli, then directly checking
    // 'google' obj will throw an error at the time of transpiling.
    callback();
    return true;
  }

  window.mapApiInitialized = callback;
  let script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_Google_Map_Key}&libraries=places,geometry&callback=mapApiInitialized`;
  document.body.appendChild(script);
};

export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  background-color: #0ae;

  background-image: -webkit-gradient(
    linear,
    0 0,
    0 100%,
    color-stop(0.5, rgba(255, 255, 255, 0.2)),
    color-stop(0.5, transparent),
    to(transparent)
  );
}
</style>
