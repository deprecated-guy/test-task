// memoize.decorator.ts
export function pure() {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const originalGetter = descriptor.get;

		if (!originalGetter) {
			throw new Error('[Decorator Error]: pure decorator can only be applied to getters');
		}

		// eslint-disable-next-line symbol-description
		const cacheKey = Symbol();

		descriptor.get = function () {
			if (!Object.prototype.hasOwnProperty.call(this, cacheKey)) {
				Object.defineProperty(this, cacheKey, {
					value: originalGetter.call(this),
					writable: false,
					enumerable: false,
					configurable: false,
				});
			}

			// eslint-disable-next-line ts/ban-ts-comment
			// @ts-expect-error
			return this[cacheKey];
		};

		return descriptor;
	};
}
