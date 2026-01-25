import { notify } from "@/app/toast/toast";
import {
    CommonDataTable,
    type CommonDataTableColumn,
} from "@/shared/components/common/CommonDataTable/CommonDataTable";
import { Anchor, Badge, Box, Group, Image, Stack, Text, Title } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { useProduct, useProducts } from "../api";
import type { Product } from "../type";
import { isNullOrEmpty } from "@/utils";

export const ProductsDataTable = () => {
    const { data: productList, isLoading, isError, error } = useProducts({ limit: 100 });
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const { data: productDetail } = useProduct(selectedProductId ?? 0);

    const products = useMemo(() => productList?.products || [], [productList?.products]);

    const categories = useMemo(() => {
        const cats = new Set(products.map((p) => p.category));
        return Array.from(cats);
    }, [products]);

    const brands = useMemo(() => {
        const brandSet = new Set(products.map((p) => (!isNullOrEmpty(p.brand) ? p.brand : "")));
        return Array.from(brandSet);
    }, [products]);

    const handleClickAnchor = (id: number) => {
        const product = products.find((p) => p.id === id);
        if (product) {
            setSelectedProductId(product.id);
        }
    };

    useEffect(() => {
        if (productDetail) {
            console.log("product detail loaded", productDetail);
        }
    }, [productDetail]);

    const columns: CommonDataTableColumn<Product>[] = [
        {
            accessor: "id",
            title: "#",
            textAlign: "center",
            width: 60,
            sortable: true,
        },
        {
            accessor: "thumbnail",
            title: "Image",
            width: 80,
            render: ({ thumbnail, title }: Product) => (
                <Image src={thumbnail} alt={title} width={50} height={50} fit="cover" radius="sm" />
            ),
        },
        {
            accessor: "title",
            title: "Product Name",
            sortable: true,
            filterConfig: {
                filterType: "text",
                textPlaceholder: "Search product...",
                textLabel: "Product Name",
            },
            render: ({ id, title }: Product) => (
                <Anchor onClick={() => handleClickAnchor(id)}>{title}</Anchor>
            ),
        },
        {
            accessor: "category",
            title: "Category",
            width: 150,
            sortable: true,
            filterConfig: {
                filterType: "multiselect",
                multiselectData: categories,
                multiselectPlaceholder: "Select category...",
                multiselectLabel: "Category",
            },
            render: ({ category }: Product) => (
                <Badge variant="light" color="blue">
                    {category}
                </Badge>
            ),
        },
        {
            accessor: "brand",
            title: "Brand",
            width: 150,
            sortable: true,
            filterConfig: {
                filterType: "multiselect",
                multiselectData: brands,
                multiselectPlaceholder: "Select brand...",
                multiselectLabel: "Brand",
            },
        },
        {
            accessor: "price",
            title: "Price",
            width: 120,
            textAlign: "right",
            sortable: true,
            filterConfig: {
                filterType: "numberRange",
                numberRangeLabel: "Price",
                numberRangePlaceholderMin: "Min",
                numberRangePlaceholderMax: "Max",
                numberRangeCurrency: "$",
            },
            render: ({ price }: Product) => (
                <Text fw={600} c="green">
                    ${price.toFixed(2)}
                </Text>
            ),
        },
        {
            accessor: "rating",
            title: "Rating",
            width: 100,
            textAlign: "center",
            sortable: true,
            filterConfig: {
                filterType: "numberRange",
                numberRangeLabel: "Rating",
            },
            render: ({ rating }: Product) => (
                <Group gap={4} justify="center">
                    <Text>⭐</Text>
                    <Text fw={500}>{rating.toFixed(2)}</Text>
                </Group>
            ),
        },
        {
            accessor: "stock",
            title: "Stock",
            width: 100,
            textAlign: "right",
            sortable: true,
            render: ({ stock }: Product) => {
                const color = stock < 50 ? "red" : stock < 100 ? "yellow" : "green";
                return <Badge color={color}>{stock}</Badge>;
            },
        },
    ];

    if (isError) {
        return (
            <Box>
                <Title order={2} mb="lg">
                    Products from DummyJSON
                </Title>
                <Text c="red">Error loading products: {error?.message || "Unknown error"}</Text>
            </Box>
        );
    }

    return (
        <Box>
            <Stack gap="md" mb="lg">
                <Title order={2}>Products from DummyJSON</Title>
                <Text size="sm" c="dimmed">
                    Total products: {productList?.total || 0} | Showing: {products.length}
                </Text>
            </Stack>
            <CommonDataTable<Product>
                records={products}
                columns={columns}
                fetching={isLoading}
                rowBackgroundColor={({ stock }: Product) =>
                    stock < 50
                        ? { light: "#fff5f5", dark: "#3b1d1d" }
                        : stock < 100
                          ? { light: "#fffbeb", dark: "#3b2f1d" }
                          : undefined
                }
                onRowClick={({ record }: { record: Product }) => {
                    notify.success("Product selected", record.title);
                }}
            />
        </Box>
    );
};
