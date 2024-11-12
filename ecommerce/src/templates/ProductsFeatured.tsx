import { useState } from "react";
import { Transition } from "@headlessui/react";
import { ProductListEntity } from "@incutonez/spec";
import { IconNext, IconPrevious } from "@/assets/icons.tsx";
import { BaseButton } from "@/components/BaseButton.tsx";
import { useInterval } from "@/hooks/common.ts";
import { useGetProductsFeatured } from "@/hooks/products.ts";

export interface IProductFeatured {
	products: ProductListEntity[];
}

export function ProductsFeatured() {
	const products = useGetProductsFeatured();
	const [delay, setDelay] = useState<number | null>(8000);
	const [reverse, setReverse] = useState(false);
	const [current, setCurrent] = useState(0);
	const productNodes = products.map((product, index) => {
		const enterFrom = reverse ? "-translate-x-full" : "translate-x-full";
		const leaveTo = reverse ? "translate-x-full" : "-translate-x-full";
		return (
		/**
       * Idea taken from https://marckohler.medium.com/a-tailwindcss-carousel-that-cant-get-any-simpler-cdb423b1bc40
       */
			<Transition
				key={index}
				show={current === index}
				enter="transition ease-in duration-1000"
				enterFrom={enterFrom}
				enterTo="translate-x-0"
				leave="transition ease-in duration-1000"
				leaveFrom="translate-x-0"
				leaveTo={leaveTo}
			>
				<section className="absolute inset-0 m-4 rounded border border-gray-700 p-2">
					{product.name}
				</section>
			</Transition>
		);
	});

	/**
   * This can be called to reset the carousel's scroll... it's needed for when next/previous are clicked because
   * the user actually wants to see the previous item for a longer period of time, and if the useInterval was close
   * to calling its callback, then they would only see the item for a short period.
   */
	function resetTimer() {
		setDelay(null);
		setTimeout(() => setDelay(8000), 2000);
	}

	function previous() {
		setReverse(true);
		if (current === 0) {
			setCurrent(products.length - 1);
		}
		else {
			setCurrent(current - 1);
		}
	}

	function next() {
		setReverse(false);
		if (current === products.length - 1) {
			setCurrent(0);
		}
		else {
			setCurrent(current + 1);
		}
	}

	function onClickPrevious() {
		resetTimer();
		previous();
	}

	function onClickNext() {
		resetTimer();
		next();
	}

	useInterval(next, delay);

	return (
		<article className="flex size-full items-center px-4">
			<BaseButton
				icon={IconPrevious}
				onClick={onClickPrevious}
			/>
			<article className="relative flex h-full flex-1 space-x-4 overflow-hidden">
				{productNodes}
			</article>
			<BaseButton
				icon={IconNext}
				onClick={onClickNext}
			/>
		</article>
	);
}
