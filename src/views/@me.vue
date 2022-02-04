<template>
  <div v-if="user">
    <!--user_metadata is the key supabase nests all arbitrary meta data under-->
    <div>Hello {{ user.user_metadata.username }}</div>
  </div>
</template>

<script setup lang="ts">
import useAuth from '@/use/auth';

const { user } = useAuth();
</script>
