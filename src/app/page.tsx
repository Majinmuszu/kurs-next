import ProductsList from "@/ui/organisms/ProductsList";
import Image from "next/image";

export default function Home() {
	const productsList = [
		{
			id: "clsj4znmn0000jmff8lyf4gf0",
			name: "Intelligent Rubber Mouse",
			slug: "intelligent-rubber-mouse",
			description:
				"The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
			price: 84700,
		},
		{
			id: "clsj4znms0001jmffox653xtn",
			name: "Practical Rubber Chicken",
			slug: "practical-rubber-chicken",
			description: "The Football Is Good For Training And Recreational Purposes",
			price: 40200,
		},
		{
			id: "clsj4znmt0002jmff8e2uppvo",
			name: "Small Steel Bike",
			slug: "small-steel-bike",
			description: "The Football Is Good For Training And Recreational Purposes",
			price: 95300,
		},
		{
			id: "clsj4znmv0003jmffoks47aac",
			name: "Sleek Rubber Salad",
			slug: "sleek-rubber-salad",
			description: "The Football Is Good For Training And Recreational Purposes",
			price: 32400,
		},
		{
			id: "clsj4znmw0004jmffn2rk02wz",
			name: "Unbranded Plastic Shirt",
			slug: "unbranded-plastic-shirt",
			description:
				"The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
			price: 89700,
		},
		{
			id: "clsj4zsji0000i2mwz00kdvm6",
			name: "Handmade Granite Sausages",
			slug: "handmade-granite-sausages",
			description:
				"The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
			price: 800,
		},
		{
			id: "clsj4zsjk0001i2mwa3llrfde",
			name: "Sleek Bronze Hat",
			slug: "sleek-bronze-hat",
			description:
				"Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
			price: 65900,
		},
		{
			id: "clsj4zsjl0002i2mw8jhz4lrp",
			name: "Recycled Wooden Computer",
			slug: "recycled-wooden-computer",
			description:
				"New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
			price: 68300,
		},
		{
			id: "clsj4zsjm0003i2mw9wivds6n",
			name: "Ergonomic Steel Tuna",
			slug: "ergonomic-steel-tuna",
			description: "The Football Is Good For Training And Recreational Purposes",
			price: 49700,
		},
		{
			id: "clsj4zsjn0004i2mw6kj9sc57",
			name: "Elegant Rubber Pants",
			slug: "elegant-rubber-pants",
			description: "The Football Is Good For Training And Recreational Purposes",
			price: 15400,
		},
	];
	return (
		<section className="my-8">
			<ProductsList products={productsList} />
		</section>
	);
}
