// src/app/api/pokemon/[id]/route.ts

import client from "@/lib/prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

type FindById = {
  id: string;
};

export async function GET(request: NextRequest, context: { params: FindById }) {
  try {
    const pokemon = await client.pokemon.findUniqueOrThrow({
      where: {
        id: Number(context.params.id),
      },
    });
    return new NextResponse(JSON.stringify(pokemon), {
      status: 200,
      statusText: "OK",
    });
  } catch (error) {
    const msgError = (error as PrismaClientKnownRequestError).message;

    return new NextResponse(JSON.stringify({ message: msgError }), {
      status: 404,
      statusText: "Not Found",
    });
  }
}

export async function PUT(request: NextRequest, context: { params: FindById }) {
  const updatedPokemon = await request.json();
  try {
    const pokemon = await client.pokemon.update({
      where: {
        id: Number(context.params.id),
      },
      data: updatedPokemon,
    });
    return new NextResponse(JSON.stringify(pokemon), {
      status: 200,
      statusText: "OK",
    });
  } catch (error) {
    const msgError = (error as PrismaClientKnownRequestError).message;

    return new NextResponse(JSON.stringify({ message: msgError }), {
      status: 404,
      statusText: "Not Found",
    });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: FindById }
) {
  try {
    await client.pokemon.delete({
      where: {
        id: Number(context.params.id),
      },
    });
    return new NextResponse(null, {
      status: 204,
      statusText: "No Content",
    });
  } catch (error) {
    const msgError = (error as PrismaClientKnownRequestError).message;

    return new NextResponse(JSON.stringify({ message: msgError }), {
      status: 404,
      statusText: "Not Found",
    });
  }
}
