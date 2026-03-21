<template>
  <section class="space-y-8">
    <div class="space-y-2">
      <p class="text-xs uppercase tracking-[0.3em] text-slate-400">Public API Gallery</p>
      <h1 class="text-3xl font-semibold text-white sm:text-4xl">
        API Gallery Scaffold
      </h1>
      <p class="max-w-2xl text-slate-300">
        This is the Milestone 0 scaffold. Each demo route exists so we can
        build out the real API experiences next.
      </p>
    </div>

    <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink class="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-slate-100 transition hover:border-slate-700" to="/apis/simpsons">
        The Simpsons API
      </NuxtLink>
      <NuxtLink class="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-slate-100 transition hover:border-slate-700" to="/apis/pokemon">
        PokeAPI
      </NuxtLink>
      <NuxtLink class="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-slate-100 transition hover:border-slate-700" to="/apis/rick-morty">
        Rick and Morty API
      </NuxtLink>
      <NuxtLink class="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-slate-100 transition hover:border-slate-700" to="/apis/harry-potter">
        Harry Potter API
      </NuxtLink>
      <NuxtLink class="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-slate-100 transition hover:border-slate-700" to="/apis/ghibli">
        Studio Ghibli API
      </NuxtLink>
      <NuxtLink class="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-slate-100 transition hover:border-slate-700" to="/apis/dogs">
        Dog API
      </NuxtLink>
      <NuxtLink class="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-slate-100 transition hover:border-slate-700" to="/apis/star-wars">
        SWAPI
      </NuxtLink>
      <NuxtLink class="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-slate-100 transition hover:border-slate-700" to="/apis/trivia">
        Open Trivia DB
      </NuxtLink>
      <NuxtLink class="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-slate-100 transition hover:border-slate-700" to="/apis/random-users">
        Random User Generator
      </NuxtLink>
      <NuxtLink class="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-slate-100 transition hover:border-slate-700" to="/apis/meals">
        TheMealDB
      </NuxtLink>
      <NuxtLink class="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-slate-100 transition hover:border-slate-700" to="/apis/books">
        Open Library API
      </NuxtLink>
    </div>
  </section>
</template>
