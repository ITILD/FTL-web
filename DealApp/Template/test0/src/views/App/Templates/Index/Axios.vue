<!-- MyBook.vue -->
<template>
  <div>axios</div>
  <div>{{ collectionName }}: {{ readersNumber }} {{ book.title }}</div>
  <div>{{ axiosReturn }}</div>
  <div>{{ x }}:{{y}}</div>
</template>

<script>
import { onMounted,ref, reactive } from "vue";
import axios from "axios";
export default {
  props: {
    collectionName: String,
  },
  setup(props) {
    const readersNumber = ref(0);
    const book = reactive({ title: "Vue 3 Guide" });
    const axiosReturn = ref(0);

    onMounted(() => {
      axios.get("http://localhost:8081/test/city").then((res) => {
        console.log(77, res);
        if (res.data) {
          // this.cityList = res.data.cityList
          axiosReturn.value = res;
        }
      });
    });
	let x = ref(0)
	let y = ref(0)

	onMounted(() => {
		window.addEventListener('mousemove', e => {
			x.value = e.pageX
			y.value = e.pageY
		})
	})

    // 暴露给 template
    return {
      readersNumber,
      book,
      axiosReturn,
      x,y
    };
  },
};
</script>