<template>
  <section :id="`category-${category.id}`" class="category-section">
    <div class="icon-container">
      <div class="tail"></div>
      <div class="icon">
        <component :is="getIcon(category.icon)" />
      </div>
    </div>
    <h2 class="title">{{ category.title }}</h2>

    <div class="sounds-grid">
      <SoundCard
        v-for="sound in category.sounds"
        :key="sound.id"
        :sound="sound"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import * as LucideIcons from "lucide-vue-next";
import type { Category } from "@/data/types";
import SoundCard from "@/components/SoundCard.vue";

defineProps<{
  category: Category;
}>();

const getIcon = (icon: any) => {
  if (typeof icon === "string" && (LucideIcons as any)[icon]) {
    return (LucideIcons as any)[icon];
  }
  return icon;
};
</script>

<style scoped lang="scss">
.category-section {
  margin-bottom: 20px;

  &:not(:last-of-type) {
    margin-bottom: 20px;
  }
}

.icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;

  .tail {
    width: 1px;
    height: 75px;
    background: linear-gradient(transparent, var(--color-category-tail));
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    font-size: 18px;
    background: linear-gradient(
      var(--color-category-icon-bg-from),
      var(--color-category-icon-bg-to)
    );
    border: 1px solid var(--color-category-icon-border);
    border-radius: 50%;
    color: var(--color-category-icon-fg);
    transition:
      background 0.3s ease,
      border-color 0.3s ease,
      color 0.3s ease;
  }
}

.title {
  font-family: "Fraunces", serif;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  color: var(--color-fg-primary);
  transition: color 0.3s ease;
}

.sounds-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
