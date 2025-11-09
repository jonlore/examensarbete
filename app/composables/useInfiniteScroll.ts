export default function useInfiniteScroll(callback: () => void, options?: IntersectionObserverInit) {
  const target = ref<HTMLElement | null>(null)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    observer = new IntersectionObserver(entries => {
      if (entries[0]?.isIntersecting) callback()
    }, options)

    if (target.value) observer.observe(target.value)
  })

  onBeforeUnmount(() => {
    if (observer && target.value) observer.unobserve(target.value)
  })

  return { target }
}
