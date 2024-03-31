import React from 'react'
import Layout from '../Layout/Layout'
const AllProducts = () => {
  return (
    <>
    <Layout>
    <section class="text-gray-600 body-font" data-test-id="7a61787824252420">
        <div
          class="container px-5 py-24 mx-auto"
          data-test-id="7a61787821242723"
        >
          <div class="flex flex-wrap -m-4" data-test-id="7a61787821252723">
            <div
              class="lg:w-1/4 md:w-1/2 p-4 w-full"
              data-test-id="7a61787821262723"
            >
              <a
                class="block relative h-48 rounded overflow-hidden"
                data-test-id="7a6178782424"
              >
                <img
                  alt="ecommerce"
                  class="object-cover object-center w-full h-full block"
                  src="https://dummyimage.com/420x260"
                  data-test-id="7a617878242220"
                />
              </a>
              <div class="mt-4" data-test-id="7a61787821272723">
                <h3
                  class="text-gray-500 text-xs tracking-widest title-font mb-1"
                  data-test-id="7a617878242127"
                >
                  CATEGORY
                </h3>
                <h2
                  class="text-gray-9/*  */00 title-font text-lg font-medium"
                  data-test-id="7a617878242126"
                >
                  The Catalyzer
                </h2>
                <p class="mt-1" data-test-id="7a617878242d26">
                  $16.00
                </p>
              </div>
            </div>
            <div
              class="lg:w-1/4 md:w-1/2 p-4 w-full"
              data-test-id="7a61787821202723"
            >
              <a
                class="block relative h-48 rounded overflow-hidden"
                data-test-id="7a6178782524"
              >
                <img
                  alt="ecommerce"
                  class="object-cover object-center w-full h-full block"
                  src="https://dummyimage.com/421x261"
                />
              </a>
              <div class="mt-4" data-test-id="7a61787821212723">
                <h3
                  class="text-gray-500 text-xs tracking-widest title-font mb-1"
                >
                  CATEGORY
                </h3>
                <h2
                  class="text-gray-900 title-font text-lg font-medium"
                >
                  Shooting Stars
                </h2>
                <p class="mt-1" >
                  $21.15
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
    </>
  )
}

export default AllProducts