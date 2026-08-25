import { prisma } from "./lib/prisma";

async function main() {
    const user = await prisma.user.create({
        data: {
            name: "Demo User",
            email: "demo@smartmail.local",
        },
    });
}
main()
    .catch((error) => {
        console.error(error);
    }).finally(async () => {
        await prisma.$disconnect();
    })