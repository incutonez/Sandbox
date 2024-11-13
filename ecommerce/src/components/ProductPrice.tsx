import { BaseHTMLAttributes } from "react";
import classNames from "classnames";

export interface IProductPrice extends BaseHTMLAttributes<HTMLElement> {
	price: number;
}

export function ProductPrice({ price, className = "" }: IProductPrice) {
	const [whole, fraction = ""] = `${price}`.split(".");
	className = classNames("flex items-start space-x-0.5", className);
	return (
		<div className={className}>
			<span className="text-sm leading-7">$</span>
			<span className="text-2xl font-semibold">
				{parseInt(whole, 10).toLocaleString()}
			</span>
			<span className="text-sm leading-7">
				{fraction.padEnd(2, "0")}
			</span>
		</div>
	);
}
