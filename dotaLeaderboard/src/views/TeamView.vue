<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";

const route = useRoute();
const id = ref(route.query.id);
const data = ref(null);
const team = ref(null);
const teamMembers = ref([]);

const getData = async () => {
  try {
    const response = await axios.get(`/team?id=${id.value}`);
    return response.data; // Возвращаем `data`, а не `response`
  } catch (error) {
    console.error("Ошибка при получении данных команды:", error);
    return null;
  }
};

onMounted(async () => {
  const result = await getData();
  if (result) {
    data.value = result;
    team.value = result.team || {};
    teamMembers.value = team.value.members || [];

    if (team.value.name) {
      document.title = team.value.name;
    }

    console.log("Команда:", team.value, "Участники:", teamMembers.value);
  }
});
</script>

<template>
  <main class="mx-auto my-0 w-4/5">

    <ul v-if="teamMembers.length > 0" class="grid grid-cols-5 gap-3">
      <img :src="team.url_logo" class="bg-black" />
      <li v-for="member in teamMembers" :key="member.id" v-if="member.role !== 0" >
        <div class="card" >
          {{ member.role }}
        </div>
      </li>
    </ul>
    <p v-else>Нет данных о членах команды</p>
  </main>
</template>

