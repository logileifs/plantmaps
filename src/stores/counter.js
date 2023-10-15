import { ref } from 'vue'
import { defineStore } from 'pinia'
import { s3Client } from "@/s3client.js";
import * as utils from '@/utils.js'
import { ListObjectsCommand } from "@aws-sdk/client-s3";

const BUCKET_NAME = import.meta.env.VITE_BUCKET_NAME

async function fetchData(url) {
  let value = await fetch(url)
  .catch(
    (error) => {
      console.log(error);
      return null
    }
  ).then(
    (response) => {
      return response.json()
  }).catch(
    (error) => {
      return null
  })
  return value
}

async function fetchBucketFolder(folderName) {
  var listResponse = await s3Client.send(
    new ListObjectsCommand(
      {
        Bucket: BUCKET_NAME,
        Prefix: folderName,
        Marker: `${folderName}/`
      }
    )
  )
  let promises = []
  listResponse.Contents.map((item) => {
    promises.push(fetchData(
      `https://${BUCKET_NAME}.ams3.digitaloceanspaces.com/${item.Key}`
    ))
  })
  let items = await Promise.all(promises)
  return items
}

export const useCounterStore = defineStore('counter', () => {
  const mapStyle = ref('outdoors-v12')
  const firstFrostLayers = ref([])
  const lastFrostLayers = ref([])
  const plants = ref([])
  const sources = ref(
    {
      'plants': [],
      'firstfrost': [],
      'lastfrost': [],
    }
  )

  async function fetchFirstFrost() {
    this.firstFrostLayers = await fetchBucketFolder('firstfrost')
    // Get a range of colors between white and blue
    let colors = utils.interpolateColors(
      "rgb(255, 255, 255)", // white
      "rgb(0, 0, 255)",     // blue
      this.firstFrostLayers.length
    )
    this.firstFrostLayers.map((item, index) => {
      item['color'] = `rgb(${colors[index]})`
      console.log(`setting ${item.name} color ${item.color}`)
    })
  }

  async function fetchPlants() {
    console.log('fetching plants')
    this.plants = await fetchBucketFolder('plants')
    console.log(this.plants)
    console.log('plants received')
  }

  async function fetchAll() {
    await this.fetchFirstFrost()
    await this.fetchPlants()
  }

  return {
    plants,
    mapStyle,
    fetchAll,
    fetchPlants,
    fetchFirstFrost,
    firstFrostLayers,
    lastFrostLayers,
  }
})
