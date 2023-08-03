<template>
  <div class="login_container">
    <img src="@/assets/rohan.png" class="frame" />
    <div class="group">
      <v-card class="form" elevaton="5">
        <div class="logo mt-2 text-center">
          <img src="@/assets/yubi.png" height="140" class="text-center" />
        </div>
        <div class="text-h5 text-center">Kitchen Display</div>
        <v-form ref="form_login" lazy-validation>
          <div class="mt-4">
            <div class="mb-2" style="font-weight: 700">Account</div>
            <v-text-field label="Username" v-model="form_login.username" :rules="rule_username"></v-text-field>
          </div>
          <div class="my-4">
            <div class="mb-2 mt-6" style="font-weight: 700">Password</div>
            <v-text-field type="password" placeholder="****" v-model="form_login.password"></v-text-field>
          </div>
          <div style="text-align: right">
            <v-btn color="primary" append-icon="mdi-arrow-right" type="submit" :loading="btnLoading"
              :disabled="btnLoading" block @click.prevent="handleLogin">Login</v-btn>
          </div>
        </v-form>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data: () => ({
    isLoading: false,
    btnLoading: false,
    form_valid: true,
    form_error: false,
    form_login: {
      username: "",
      password: "",
    },
    rule_username: [
      (v) => !!v || "Username is required",
      (v) =>
        (v && v.length <= 10) || "Username must be less than 10 characters",
    ],
    rule_password: [
      (v) => !!v || "Password is required",
      (v) =>
        (v && v.length <= 10) || "Password must be less than 10 characters",
    ],
  }),

  created() {
    if (this.$store.getters["auth/Authenticated"]) {
      this.$router.push("/home");
    }
  },

  methods: {
    ...mapActions("auth", ["submit"]),

    handleLogin() {
      this.btnLoading = true;
      this.submit(this.form_login).then(() => {
        if (this.$store.getters["auth/Authenticated"]) {
          this.$router.push("/home");
          this.btnLoading = false;
        }
      });
    },
  },
};
</script>
 
<style lang="scss" scoped>
.login_container {
  height: 100vh;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s;
  position: relative;
  background-color: #fff;
  overflow: hidden;

  .frame {
    position: absolute;
    left: -5%;
    top: -5%;
    width: 110%;
    height: 110%;
    filter: blur(20px);
  }

  .group {
    display: flex;
    position: relative;
    z-index: 1;
    border-radius: 20px;
    overflow: hidden;

    .form {
      width: 550px;
      margin: 0 auto;
      background: #f6f6f6;
      height: 600px;
      padding: 60px;

      .title {
        font-size: 36px;
        font-weight: 700;
        font-family: Roboto, sans-serif !important;
        margin-bottom: 20px;
      }
    }

    .desc {
      height: 100%;
      margin: 0 auto;
      width: 460px;
      background-image: linear-gradient(to bottom, #d4e5f5, #e1edf3);
      height: 400px;
      padding: 60px;
      text-align: center;

      .logo {
        text-align: center;
      }
    }
  }
}
</style>