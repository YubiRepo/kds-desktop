<template #content>
  <v-layout>
    <!-- <v-app-bar title="&nbsp;">
      <v-snackbar v-model="snackbar" :timeout="3000" color="success" location="top">
        Order has been updated
      </v-snackbar>
      <div class="tool_btns">
        <v-btn variant="text" />
        <v-btn variant="text" append-icon="mdi-chevron-down" class="mr-2">
          <v-avatar size="x-small" class="avatarmr-2">
          </v-avatar>
          <span><strong>USER</strong></span>
          <v-menu activator="parent">
            <v-list nav class="h_a_menu">
              <v-list-item title="Logout" prepend-icon="mdi-login" @click="logout()" />
            </v-list>
          </v-menu>
        </v-btn>
      </div>
    </v-app-bar> -->
    <v-main>
      <div style="position: relative">
        <v-row class="mx-5 mt-4">
          <v-responsive style="max-height: 90vh;">
            <v-card>
              <v-row>
                <v-col md="12" sm="12" lg="12" class="text-right">
                  <v-card-title>Date: {{ timestamp }}</v-card-title>
                </v-col>
              </v-row>
            </v-card>
            <div class="tableFixHead">
              <table ref="scrollToMe">
                <thead style="position:sticky;top:0%;background-color:#333;color:#fff;">
                  <tr>
                    <th width="20%;">
                      <h1>Group</h1>
                    </th>
                    <th width="35%;">
                      <h1>Menu</h1>
                    </th>
                    <th width="12%;">
                      <h1>Order</h1>
                    </th>
                    <th width="12%;">
                      <h1>Out</h1>
                    </th>
                    <th width="12%;">
                      <h1>On Progress</h1>
                    </th>
                  </tr>
                </thead>
                <tbody v-if="SalesOrder.length > 0">
                  <tr v-for="row in SalesOrder" :key="row.id" v-if="SalesOrder != 'Not Found'">
                    <td v-if="row.jumlah != row.selisih && row.selisih == 0" style="background-color: red;">
                      <h2>{{ row.groupname }}</h2>
                    </td>
                    <td v-else>
                      <h2>{{ row.groupname }}</h2>
                    </td>
                    <td v-if="row.jumlah != row.selisih && row.selisih == 0" style="background-color: red;">
                      <h2>{{ row.menuname }}</h2>
                    </td>
                    <td v-else>
                      <h2>{{ row.menuname }}</h2>
                    </td>
                    <td v-if="row.jumlah != row.selisih && row.selisih == 0"
                      style="text-align: center;background-color: red;">
                      <h2>{{ row.jumlah }}</h2>
                    </td>
                    <td v-else style=" text-align: center;">
                      <h2>{{ row.jumlah }}</h2>
                    </td>
                    <td v-if="row.jumlah != row.selisih && row.selisih == 0"
                      style=" text-align: center;background-color: red;">
                      <h2>{{ row.selisih }}</h2>
                    </td>
                    <td v-else style=" text-align: center;">
                      <h2>{{ row.selisih }}</h2>
                    </td>
                    <td v-if="row.jumlah != row.selisih && row.selisih == 0"
                      style="text-align: center;background-color: red;">
                      <h2>{{ row.jumlah - row.selisih }}</h2>
                    </td>
                    <td v-else style=" text-align: center;">
                      <h2>{{ row.jumlah - row.selisih }}</h2>
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr style="text-align: center;">
                    <td colspan="5">
                      <h2>No Order</h2>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </v-responsive>
        </v-row>
      </div>
    </v-main>
  </v-layout>
</template>
<script>

import $axios from "@/plugins/api.js";
import { mapGetters, mapMutations } from "vuex";
import MainLayout from "../layouts/MainLayout.vue";

export default {
  name: "HomeView",
  components: {
    MainLayout,
  },
  data() {
    return {
      tab: null,
      snackbar: false,
      timestamp: "",
      scrollcuy: false,
    };
  },

  methods: {
    ...mapMutations("sales_order", ["SET_SALES_ORDER"]),
    async getSalesOrder() {
      await $axios
        .get("/apporder/api/kdsitem", {
        })
        .then(({ data }) => {
          this.SET_SALES_ORDER(data.KDS);
          this.loading = false;
        });
    },
    getNow: function () {
      const today = new Date();
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + ' | ' + time;
      this.timestamp = dateTime;
    },
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },

    scrollToElement() {
      const el = this.$refs.scrollToMe;
      setInterval(() => {
        const el = this.$refs.scrollToMe;
        const maxScrollTop = el.scrollHeight - el.clientHeight;
        const currentScrollTop = el.scrollTop;
        if (currentScrollTop === maxScrollTop) {
          el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        } else {
          el.scrollIntoView({ behavior: "smooth", block: "end" });
        }
      }, 37);
      setInterval(() => {
        const el = this.$refs.scrollToMe;
        this.scrollcuy = !this.scrollcuy;
        if (el && this.scrollcuy) {
          el.scrollIntoView();
        } else {
          el.scrollIntoView({ behavior: "smooth", block: "end" });
        }
      }, 40_000);
    },

    countDownTimer() {
      setInterval(() => {
        this.getSalesOrder()
      }, 10_000)
    },
  },
  computed: {
    ...mapGetters("sales_order", ["SalesOrder"]),
    ...mapGetters("auth", ["User"]),
  },
  created() {
    this.countDownTimer();
    this.getSalesOrder();
    setInterval(this.getNow, 1000)
  },
  mounted() {
    window.Echo.channel(`branch.${this.User}`).listen('SalesOrderUpdated', (e) => {
      console.log('go branch');
      this.getSalesOrder();
      this.snackbar = true;
    })
    this.scrollToElement();
  }
};
</script>
<style>
.tableFixHead {
  overflow-y: auto;
  height: calc(100vh - 15%);
}

.tableFixHead thead th {
  position: sticky;
  top: 0px;
  background-color: #7BC2FF;
}

table {
  border-collapse: collapse;
  /* make the table borders collapse to each other */
  width: 100%;
}

th,
td {
  padding: 8px 16px;
  border: 2px solid black;
}

.Bold {
  font-weight: bold;
}

th {
  background: #eee;
}
</style>