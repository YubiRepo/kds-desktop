<template>
  <v-app id="inspire">
    <slot name="content"></slot>
  </v-app>
<<<<<<< HEAD
</template>
=======
</template>

<script>
export default {
  name: "App",
  created() {
    if (!this.$store.getters["auth/Authenticated"]) {
      this.$router.push("/login");
    }
  },
};
</script>
>>>>>>> 5e29ebae3946e5d4f3bbbf6aef4ed944dec725c4
