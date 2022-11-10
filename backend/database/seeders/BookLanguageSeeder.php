<?php

namespace Database\Seeders;

use App\Models\BookLanguage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookLanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        BookLanguage::create([
            'name' => 'magyar',
        ]);

        BookLanguage::create([
            'name' => 'angol',
        ]);

        BookLanguage::create([
            'name' => 'német',
        ]);

        BookLanguage::create([
            'name' => 'spanyolol',
        ]);
    }
}
