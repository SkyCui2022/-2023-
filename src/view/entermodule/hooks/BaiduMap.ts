import { ref } from 'vue'

export default function useMap () {
  const baiduRef = ref()
  const map = ref()
  const point = ref()

  function initMap (lng = 116.405725, lat = 39.935362) {
    map.value = new BMap.Map(baiduRef.value)
    point.value = new BMap.Point(lng, lat)

    map.value.centerAndZoom(point.value, 15)
    map.value.enableScrollWheelZoom(true) //滚轮缩放
  }

  function addMarker (lng: number, lat: number, icon?: string) {
    let marker
    if (icon) {
      marker = new BMap.Marker(new BMap.Point(lng, lat), {
        icon: new BMap.Icon(icon, new BMap.Size(30, 33))
      })
    } else {
      marker = new BMap.Marker(new BMap.Point(lng, lat))
    }

    map.value.addOverlay(marker)
    return marker
  }
  return { addMarker, initMap, baiduRef, map, point }
}
