import { base } from "../network/base";

export async function fetchDetailPermintaaan(ruangnaID: string, tanggal: string) {
    const response = await base.get(`/get_detail_permintaan/${ruangnaID}/${tanggal}`)
    return response.data
  }