<template>
  <div>
    <table>
      <tr>
        <th>中文名</th>
        <td>{{ data.name }}</td>
        <th>保护级别</th>
        <td>{{ data.protectionLevel }}</td>
      </tr>
      <tr>
        <th>地理位置</th>
        <td>{{ data.location }}</td>
        <th>编号</th>
        <td>{{ data.code }}</td>
      </tr>
      <tr>
        <th>所属时代</th>
        <td>{{ data.era }}</td>
        <th>批准单位</th>
        <td>{{ data.approvalUnit }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'TableComponent',
  data() {
    return {
      data: {
        name: '唐代帝陵',
        protectionLevel: '第五批全国重点文物保护单位',
        location: '陕西省渭南市、咸阳市',
        code: '5-0184-2-040',
        era: '唐朝',
        approvalUnit: '中华人民共和国国务院'
      }
    }
  }
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 60px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  color: rgb(10, 68, 122);
}

th {
  background-color: #f4faff;
  text-align: left;
}
</style>
