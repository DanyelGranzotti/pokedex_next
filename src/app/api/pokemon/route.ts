import client from "@/lib/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const newPokemon = await req.json();
  const createdPokemon = await client.pokemon.create({
    data: newPokemon,
  });

  return new NextResponse(JSON.stringify(createdPokemon), {
    status: 201,
    statusText: "Created",
  });
}

export async function GET() {
  const allPokemon = await client.pokemon.findMany();

  return new NextResponse(JSON.stringify(allPokemon), {
    status: 200,
    statusText: "OK",
  });
}
