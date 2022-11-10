<?php

namespace Database\Seeders;

use App\Models\Author;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AuthorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Author::create([
            'name' => 'Suzanne Collins',
        ]);

        Author::create([
            'name' => 'Andrzej Sapkowski',
        ]);

        Author::create([
            'name' => 'J. R. R. Tolkien',
        ]);

        Author::create([
            'name' => 'Rick Riordan',
        ]);
    }
}
