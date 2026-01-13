<template>
  <div
    class="flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all duration-200 hover:shadow-lg hover:-translate-y-1 backdrop-blur-md group"
    style="
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    ">

    <!-- Day Name -->
    <div class="text-center">
      <span class="block text-sm font-semibold uppercase tracking-wide transition-colors duration-200 text-[#0F1419]"
        style="
              font-family: var(--font-heading); 
    
            ">
        Today
      </span>
    </div>

    <!-- Weather Icon -->
    <div class="relative">
      <p>Icon to be done later here (To Do)</p>
    </div>

    <!-- Temperature Range -->
    <div class="flex flex-col items-center gap-0.5 w-full">
      <div class="flex items-baseline gap-1">
        <span class="text-xl font-bold text-[#0F1419]" style="
                font-family: var(--font-heading);
              ">

        </span>
      </div>
      <span class="text-base text-[#536878]" style="
              font-family: var(--font-body);
            ">

      </span>
    </div>

    <!-- Weather Description -->
    <p class="text-xs text-center capitalize px-3 py-1.5 rounded-full transition-colors duration-200 text-[#45B1E8] bg-[#E0F2FB]"
      style="
         font-weight: 600;
       ">
      Test description
    </p>
  </div>
</template>