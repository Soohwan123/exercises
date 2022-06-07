<template>
  <div class="text-center">
    <div class="text-h5 q-mt-md">Your Trays</div>
    <div class="text-positive text-h6 q-mt-lg q-mb-lg">
      {{ state.status }}
    </div>
  </div>
  <q-card class="q-ma-sm">
    <q-list highlight>
      <q-item>
        <q-item-section>
          <q-item-label>ID</q-item-label>
        </q-item-section>
        <q-item-section>Date Created</q-item-section>
        <q-item-section>
          <q-item-label>Total Cals.</q-item-label>
        </q-item-section>
      </q-item>
      <q-item
        clickable
        v-for="tray in state.trays"
        :key="tray.id"
        @click="selectTray(tray.id)"
      >
        <q-item-section>
          {{ tray.id }}
        </q-item-section>
        <q-item-section>
          {{ formatDate(tray.dateCreated) }}
        </q-item-section>
        <q-item-section>
          {{ tray.totalCalories }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
  <q-dialog
    v-model="state.selectedATray"
    transition-show="rotate"
    transition-hide="rotate"
  >
    <q-card>
      <q-card-actions align="right">
        <q-btn flat label="X" color="primary" v-close-popup class="text-h5" />
      </q-card-actions>
      <q-card-section>
        <div class="text-h5 text-center">
          Tray: #{{ state.trayDetails[0].trayId }}
        </div>
      </q-card-section>
      <q-card-section class="q-pa-none text-center">
        <q-avatar>
          <img :src="`/tray.png`" />
        </q-avatar>
      </q-card-section>
      <q-card-section class="q-mb-none">
        <q-list>
          <q-item v-for="detail in state.trayDetails" :key="detail.trayId">
            <q-item-section class="text-left col-2">
              {{ detail.qty }}
            </q-item-section>
            <q-item-section class="text-left col-10">
              {{ detail.description }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-section
        class="text-center text-positive text-h6 q-mb-xs q-mt-lg q-pa-none"
      >
        {{ state.dialogStatus }}
      </q-card-section>
      <q-card-section class="q-pa-none text-center q-ma-xs">
        <div
          style="
            font-weight: bold;
            font-size: larger;
            margin-top: 0vh;
            text-align: center;
          "
        >
          <table style="border: solid">
            <tr>
              <td style="width: 20%; font-weight: bold">Protein</td>
              <td style="width: 10%; text-align: right; padding-right: 3vw">
                {{ state.traySelected.totalProtein }}
              </td>
              <td style="width: 20%; font-weight: bold">Calories</td>
              <td style="width: 10%; text-align: right; padding-right: 3vw">
                {{ state.traySelected.totalCalories }}
              </td>
              <td style="width: 20%; font-weight: bold">Carbs.</td>
              <td style="width: 10%; text-align: right; padding-right: 3vw">
                {{ state.traySelected.totalCarbs }}
              </td>
            </tr>
            <tr>
              <td style="width: 20%; font-weight: bold">Fibre</td>
              <td style="width: 10%; text-align: right; padding-right: 3vw">
                {{ state.traySelected.totalFibre }}
              </td>
              <td style="width: 20%; font-weight: bold">Choles.</td>
              <td style="width: 10%; text-align: right; padding-right: 3vw">
                {{ state.traySelected.totalCholesterol }}
              </td>
              <td style="width: 20%; font-weight: bold">Salt</td>
              <td style="width: 10%; text-align: right; padding-right: 3vw">
                {{ state.traySelected.totalSalt }}
              </td>
            </tr>
            <tr>
              <td style="width: 20%; font-weight: bold">Fat</td>
              <td style="width: 10%; text-align: right; padding-right: 3vw">
                {{ state.traySelected.totalFat }}
              </td>
              <td colspan="4">&nbsp;</td>
            </tr>
          </table>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { reactive, onMounted } from "vue";
import { fetcher } from "../utils/apiutil";
import { formatDate } from "../utils/formatutils";
export default {
  setup() {
    let state = reactive({
      status: "",
      trays: [],
      dialogStatus: "",
      selectedATray: false,
      trayDetails: [],
      traySelected: {
        id: 0,
        totalFat: 0,
        totalCholesterol: 0,
        totalSalt: 0,
        totalFibre: 0,
        totalCarbs: 0,
        totalCalories: 0,
        totalProtein: 0,
        items: [{ id: 0, qty: 0, description: "" }],
      },
    });
    onMounted(() => {
      loadTrays();
    });

    const loadTrays = async () => {
      try {
        let user = JSON.parse(sessionStorage.getItem("user"));
        const payload = await fetcher(`tray/${user.email}`);
        if (payload.error === undefined) {
          state.trays = payload;
          state.status = `loaded ${state.trays.length} trays`;
        } else {
          state.status = payload.error;
        }
      } catch (err) {
        console.log(err);
        state.status = `Error has occured: ${err.message}`;
      }
    };

    const selectTray = async (trayId) => {
      try {
        let user = JSON.parse(sessionStorage.getItem("user"));
        const payload = await fetcher(`tray/${trayId}/${user.email}`);
        state.trayDetails = payload;
        state.dialogStatus = `nutrient totals for tray`;
        state.selectedATray = true;
        state.traySelected = state.trays.find((tray) => tray.id === trayId);
      } catch (err) {
        console.log(err);
        state.status = `Error has occured: ${err.message}`;
      }
    };
    return {
      state,
      formatDate,
      selectTray,
    };
  },
};
</script>
