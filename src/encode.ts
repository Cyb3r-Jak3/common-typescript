/**
 * Turns the array buffer from crypto into a string. Stolen from stackoverflow
 * @param buffer Crypto Buffer
 * @returns Hex string
 */
function hex(buffer: ArrayBuffer): string {
    const hexCodes = []
    const view = new DataView(buffer)
    for (let i = 0; i < view.byteLength; i += 4) {
        //Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
        // const value =
        // toString(16) will give the hex representation of the number without padding
        const stringValue = view.getUint32(i).toString(16)
        // We use concatenation and slice for padding
        const padding = '00000000'
        const paddedValue = (padding + stringValue).slice(-padding.length)
        hexCodes.push(paddedValue)
    }
    // Join all the hex strings into one

    return hexCodes.join('')
}

/**
 * Generates a hash from a string
 * @param toHash String to hash
 * @param algorithm Algorithm to use when hashing
 * @returns Hash
 */
export async function GenerateHash(
    toHash: string,
    algorithm: AlgorithmIdentifier
): Promise<string> {
    return hex(
        await crypto.subtle.digest(
            algorithm,
            new TextEncoder().encode(toHash.trim())
        )
    )
}
