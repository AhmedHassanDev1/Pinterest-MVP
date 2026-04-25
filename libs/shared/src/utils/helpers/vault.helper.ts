import axios from "axios";


export const getVaultSecrets = async (url: string, token: string) => {
    const res = await axios.get(
        url,
        {
            headers: {
                'X-Vault-Token': token,
            },
        },
    );

    return res.data?.data?.data || null;

}