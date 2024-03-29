"use client";

import Link from "next/link";
import Image from "next/image";

import { SearchProducts } from "./search-products"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { getCategories } from "@/actions/categories";

import { CategoryType } from "@/types/category";
import { Loader } from "./loader";

export const Categories = () => {

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  })

  return (
    <div className="px-14 py-4 flex justify-between items-center bg-gray-300/30">
      <div className='flex gap-x-6 items-center'>
        <Link href='/offers' className='font-medium text-lg flex justify-center items-center gap-x-2'>Offers <Badge variant='destructive' className='h-4 font-[10px] rounded-lg'>HOT %</Badge></Link>
        <Link href='/products' className='font-medium text-lg'>All Products</Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='navbar' className='font-medium text-lg hover:text-black/90'>Browse All Categories</Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className='w-[350px]'>
            {categoriesQuery.isLoading && (
              <div className='flex justify-center items-center py-5'>
                <Loader />
              </div>
            )}
            {!categoriesQuery.isLoading && categoriesQuery.data && (
              <>
                {categoriesQuery.data.map((item: CategoryType) => (
                  <CategoryItem
                    href={`/categories/${item.id}`}
                    name={item.name}
                    icon={item.icon}
                  />
                ))}
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

      </div>

      <SearchProducts />

    </div>
  )
}


interface CategoryItemProps {
  href: string,
  icon: string,
  name: string
}

const CategoryItem = ({ href, icon, name }: CategoryItemProps) => {

  const router = useRouter()

  return (
    <DropdownMenuItem onClick={() => router.push(href)} className="flex gap-x-6 px-4 items-center">
      <Image width={25} height={25} src={icon} alt='Category pic' />
      <span className='font-bold text-lg'>{name}</span>
    </DropdownMenuItem>
  )
}
