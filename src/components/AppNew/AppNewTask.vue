<script setup lang="ts"></script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline"> Open </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Create new task</SheetTitle>
      </SheetHeader>

      <p>Content</p>
    </SheetContent>
  </Sheet>
</template>
