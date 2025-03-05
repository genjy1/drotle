<script setup>
import axios from "axios";
import { ref, onMounted, watch } from "vue";
import { NCollapse, NCollapseItem, NInfiniteScroll } from "naive-ui";

const data = ref([]);
const error = ref(null);
const region = ref("europe");
const loading = ref(false);
const count = ref(10); // Количество элементов при скролле

const fetchData = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`/leaderboard?region=${region.value}`);
    data.value = response.data.data.leaderboard;
  } catch (err) {
    error.value = err;
    console.error("Ошибка при загрузке данных:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);

watch(region, fetchData);

const handleLoad = () => {
  count.value += 10; // Подгружаем еще 10 элементов
};
</script>

<template>
  <main class="w-4/5 mx-auto my-0">
    <select v-model="region" class="mt-4 w-full outline-none">
      <option value="americas">Америка</option>
      <option value="europe">Европа</option>
      <option value="se_asia">Юго-Западная Азия</option>
      <option value="china">Китай</option>
    </select>

    <div v-if="error">Ошибка: {{ error.message }}</div>
    <div v-else-if="loading">Загрузка...</div>
    <div v-else-if="!data || data.length === 0">Нет данных</div>
    <div v-else class="py-2">
      <n-infinite-scroll style="height: 90vh; overflow: auto;" :distance="10" @load="handleLoad">
        <n-collapse v-for="(item, index) in (data || []).slice(0, count)" :key="index" class="item" >
          <n-collapse-item :title="item.rank + ' ' + item.name">
            <RouterLink :to="'/team?id='+item.team_id">{{ item.team_tag }}</RouterLink> {{ item.sponsor ? item.sponsor : ''}}
          </n-collapse-item>
        </n-collapse>
      </n-infinite-scroll>
    </div>
  </main>
</template>


<style>
.n-collapse .n-collapse-item .n-collapse-item__content-wrapper .n-collapse-item__content-inner {
  padding: 0;
}
</style>
