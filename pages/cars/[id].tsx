import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

interface Data {
  id: string;
  color: string;
  image: string;
}

export default function Car({ car }: { car: Data }) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>{!car || `${car.id} ${car.color}`}</title>
      </Head>
      <h1>Hello {id}</h1>
      {!car || (
        <Image
          alt="Loading..."
          src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/420530/d24b08f2118b255cc4b976b38b3d562a00362e3a.png"
          width="64"
          height="64"
        ></Image>
      )}
    </>
  );
}

/** This is to be used for server side components */
export async function getServerSideProps({ params }: { params: any }) {
  const req = await fetch(`http:/localhost:3000/${params.id}.json`);
  const data = await req.json();

  return {
    props: { car: data },
  };
}

/** This is to be used for client side components */
// export async function getStaticProps({ params }: { params: any }) {
//   const req = await fetch(`http://localhost:3000/${params.id}.json`);
//   const { data }: { data: Data } = await req.json();
//   return {
//     props: { car: data || { image: "" } },
//   };
// }

/** This is to be used for client side components */
// export async function getStaticPaths() {
//   const req = await fetch("http://localhost:3000/cars.json");
//   const data = await req.json();

//   console.log("getStaticPaths cars:", data);

//   const paths = data.map((car: number) => {
//     return { params: { id: car } };
//   });

//   return {
//     paths,
//     fallback: false,
//   };
// }
