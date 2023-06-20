<template>
  <main-layout>
    <v-main>
      <v-container>
        <v-responsive>
          <v-row>
            <v-card-title> </v-card-title>
          </v-row>
          <v-form ref="form_data">
            <v-row class="mt-3">
              <v-col v-for="row in SalesOrder.take_away" cols="2" :key="row.id">
                <v-card height="100%" :color="row.status == 'DONE' ? 'green' : 'yellow'" class="pa-3"
                  @click="getSalesOrderDetail(row.id, row.table?.no_table)">
                  <v-row class="flex mx-auto">
                    <v-col width="100%" class="text-center" lg="12">
                      <h3 class="mb-4">Order No</h3>
                      <v-card-text style="font-size: 4rem">
                        {{ row.no_order }}
                      </v-card-text>
                    </v-col>
                    <v-col class="text-right mt-4" lg="4"> </v-col>
                    <v-col class="text-left mt-3" lg="3">
                      <div class="text-center">
                        <v-dialog v-model="dialog" width="60%">
                          <v-card width="100%">
                            <v-row>
                              <v-col class="text-right">
                                <v-card-title class="text-h5">
                                  Summary
                                </v-card-title>
                              </v-col>
                              <v-col>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="green" variant="flat" @click="dialog = false">
                                    Close Dialog
                                  </v-btn>
                                </v-card-actions>
                              </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-card-text>
                              <v-row>
                                <v-col cols="2" class="ml-15 rounded">
                                  <v-card class="pa-3" height="100%" elevation="1">
                                    <v-card-title style="overflow: auto">
                                      <h5>Order No. {{ header.no_order }}</h5>
                                      <h5>Table No. {{ no_table }}</h5>
                                    </v-card-title>
                                  </v-card>
                                </v-col>
                                <v-col cols="7" class="text-center">
                                  <v-row class="pl-15">
                                    <v-col cols="4">
                                      <v-card color="green" class="pa-3">
                                        <v-card-title style="overflow: auto">
                                          <h1>
                                            {{
                                              this.detail.reduce(
                                                (acc, item) =>
                                                  acc + item.on_done,
                                                0
                                              )
                                            }}
                                          </h1>
                                          <h5>Done</h5>
                                        </v-card-title>
                                      </v-card>
                                    </v-col>
                                    <v-col cols="4">
                                      <v-card color="yellow" class="pa-3">
                                        <v-card-title style="overflow: auto">
                                          <h1>
                                            {{
                                              this.detail.reduce(
                                                (acc, item) => acc + item.qty,
                                                0
                                              ) -
                                              this.detail.reduce(
                                                (acc, item) =>
                                                  acc + item.on_done,
                                                0
                                              )
                                            }}
                                          </h1>
                                          <h5>Not Done</h5>
                                        </v-card-title>
                                      </v-card>
                                    </v-col>
                                    <v-col cols="4">
                                      <v-card color="black" class="pa-3">
                                        <v-card-title style="overflow: auto">
                                          <h1>{{ detail.length }}</h1>
                                          <h5>Items</h5>
                                        </v-card-title>
                                      </v-card>
                                    </v-col>
                                  </v-row>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col cols="12">
                                  <v-table>
                                    <thead style="background-color: green">
                                      <tr>
                                        <th style="color: white">#</th>
                                        <th style="color: white">Item Name</th>
                                        <th style="color: white">Order</th>
                                        <th style="color: white" class="text-center">
                                          Qty Out
                                        </th>
                                        <th style="color: white" class="text-center">
                                          Balance
                                        </th>
                                        <th style="color: white" class="text-center">
                                          Status
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr v-for="(items, index) in detail" :key="index">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ items.item.name }}</td>
                                        <td>{{ items.qty }}</td>
                                        <td>
                                          <div class="d-flex align-left flex-column pa-6" color="primary">
                                            <v-btn-toggle>
                                              <v-btn type="button" variant="flat" icon="mdi-minus"
                                                @click="reduceQuantity(index)"></v-btn>
                                              <v-text-field type="number" v-model="items.qty_out" readonly></v-text-field>
                                              <v-btn type="button" icon="mdi-plus" :disabled="
                                                items.qty == items.on_done
                                              " @click="addQuantity(index)"></v-btn>
                                            </v-btn-toggle>
                                          </div>
                                        </td>
                                        <td>
                                          <div class="d-flex align-left flex-column pa-6">
                                            <v-btn-toggle>
                                              <v-text-field type="number" v-model="items.on_process"
                                                readonly></v-text-field>
                                            </v-btn-toggle>
                                          </div>
                                        </td>
                                        <td class="text-center">
                                          <v-chip color="green" class="ma-2" v-if="items.status == 'DONE'">
                                            {{ items.status }}
                                          </v-chip>
                                          <v-chip color="black" class="ma-2" text-color="black" v-else>
                                            {{ items.status }}
                                          </v-chip>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </v-table>
                                </v-col>
                              </v-row>
                              <v-divider></v-divider>
                              <br />
                              <v-btn color="primary" variant="flat" class="float-end" @click.stop="update">Update Sales
                                Order</v-btn>
                            </v-card-text>
                          </v-card>
                        </v-dialog>
                      </div>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <v-row>
                    <v-col class="text-center mt-4" lg="12">
                      <h3>Table No. {{ row.table?.no_table }}</h3>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
              <!-- <v-col v-else class="text-center">
                <div class="card-body cart">
                  <div class="col-sm-12 empty-cart-cls text-center">
                    <img
                      src="/src/assets/cart.png"
                      width="100"
                      height="100"
                      class="img-fluid mb-4 mr-3"
                    />
                    <h3><strong>Your Sales Order Is Empty</strong></h3>
                  </div>
                </div>
              </v-col> -->
            </v-row>
          </v-form>
        </v-responsive>
      </v-container>
    </v-main>
  </main-layout>
</template>
<script>
import $axios from "@/plugins/api.js";
import MainLayout from "../../layouts/MainLayout.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "TakeAway",
  components: { MainLayout },

  data() {
    return {
      dialog: false,
      header: [],
      detail: [],
      on_process: 0,
      form_data: [],
      no_table: "",
    };
  },
  methods: {
    ...mapMutations("sales_order", ["SET_SALES_ORDER"]),
    async update() {
      await $axios
        .put("/checker/sales-orders/set-status-detail", this.detail, {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/Token"]}`,
          },
        })
        .then(({ data }) => {
          this.dialog = false;
          $axios
            .get("/checker/sales-orders", {
              headers: {
                Authorization: `Bearer ${this.$store.getters["auth/Token"]}`,
              },
            })
            .then(({ data }) => {
              this.SET_SALES_ORDER(data.sales_orders);
            });
        });
    },

    async getSalesOrderDetail(id, no_table) {
      this.dialog = true;
      await $axios
        .get("/checker/sales-orders/" + id, {
          headers: {
            Authorization: `Bearer ${this.$store.getters["auth/Token"]}`,
          },
        })
        .then(({ data }) => {
          this.sales_orders = data.sales_orders.details;
          this.header = data.sales_orders;
          this.no_table = no_table;
          this.detail = data.sales_orders.details;
          this.detail.map((item) => {
            Object.assign(item, {
              qty_out: item.on_done,
              on_process: item.qty - item.on_done,
            });
            item.qty_out = item.on_done;
          });
        });
    },

    addQuantity(index) {
      if (this.detail[index].qty_out >= this.detail[index].qty) {
        return;
      }
      this.detail[index].qty_out += 1;
      this.detail[index].on_process -= 1;
    },

    reduceQuantity(index) {
      if (this.detail[index].qty_out <= 0) {
        return;
      }
      this.detail[index].qty_out -= 1;
      this.detail[index].on_process += 1;
    },
  },
  computed: {
    ...mapGetters("sales_order", ["SalesOrder"]),
  },
};
</script>