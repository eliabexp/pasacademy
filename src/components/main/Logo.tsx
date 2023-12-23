import Image from 'next/image'
import Link from 'next/link'

export default function Logo({ color }: { color?: string }) {
    let src = '/assets/icons/logo.png'
    switch(color) {
        case 'white': src = '/assets/icons/logo-white.png'; break
    }

    return <Link href="/"><Image src={src} alt="Logo" width={200} height={30}/></Link>
}
